import { SearchIcon } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";

const Search = () => {
  return (
    <div className="hidden lg:flex overflow-hidden gap-x-2 border-2 rounded-full px-4 h-11 items-center flex-1/2">
      <SearchIcon color="#3352cc" />
      <Input placeholder="Search by title, description" className="border-none outline-offset-0 ring-0 focus:ring-0 flex-1/2 dark:bg-transparent bg-transparent"/>
    </div>
  );
};

export default Search;
