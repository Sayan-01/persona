import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  //get yt video list api
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=20&key=${process.env.YOUTUBE_API_KEY}`);
  const data = await response.json();
  const videoIds = data.items.map((item: any) => item.id.videoId).join(",");

  //get yt video details by ID api
  const videoResults = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${process.env.YOUTUBE_API_KEY}`);
  const videoResultsData = await videoResults.json();
  const videos = videoResultsData.items.map((item: any) => {
    const today = new Date();
    const viewCount = parseInt(item.statistics.viewCount || "0");
    const likeCount = parseInt(item.statistics.likeCount || "0");
    const commentCount = parseInt(item.statistics.commentCount || "0");

    const publishDate = new Date(item.snippet.publishedAt);
    const daysSincePublished = Math.max((today.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24), 1);
    const viewsPerDay = viewCount / daysSincePublished;
    const engagementRate = ((likeCount + commentCount) / viewCount) * 100; // in %

    return {
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      description: item.snippet.description,
      viewCount: item.statistics.viewCount,
      likeCount: item.statistics.likeCount,
      commentCount: item.statistics.commentCount,
      viewsPerDay: viewsPerDay,
      engagementRate: engagementRate, 
    };
  });

  const viewCounts = videos.map((v: any) => v.viewCount);
  const { iqr, lowerBound, upperBound } = calculateIQR(viewCounts);
  const avgViews = viewCounts.reduce((a: number, b: number) => a + b, 0) / viewCounts.length;
  const maxViewsPerDay = Math.max(...videos.map((v: any) => v.viewsPerDay));
  const maxEngagementRate = Math.max(...videos.map((v: any) => v.engagementRate));

  const finalResult = videos.map((v: any) => {
    const isOutlier = v.viewCount < lowerBound || v.viewCount > upperBound;

    let outlierScore = 0;

    if (isOutlier && iqr > 0) {
      if (v.viewCount > upperBound) {
        outlierScore = (v.viewCount - upperBound) / iqr;
      } else if (v.viewCount < lowerBound) {
        outlierScore = (lowerBound - v.viewCount) / iqr;
      }
    }

    const smartScore = (v.viewCount / avgViews) * 0.3 + (v.viewsPerDay / maxViewsPerDay) * 0.5 + (v.engagementRate / maxEngagementRate) * 0.2;

    return {
      ...v,
      engagementRate: Number(v.engagementRate.toFixed(2)), // %
      viewsPerDay: Math.round(v.viewsPerDay),
      smartScore: Number(smartScore.toFixed(3)),
      isOutlier,
      outlierScore: Number(outlierScore.toFixed(2)),
    };
  });


  return NextResponse.json({ data: finalResult });
};

function calculateIQR(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length / 4)];
  const q3 = sorted[Math.floor((sorted.length * 3) / 4)];
  const iqr = q3 - q1;
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  return { q1, q3, iqr, lowerBound, upperBound };
}
