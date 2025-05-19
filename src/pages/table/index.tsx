import { useEffect, useState } from "react";
import { columns, type SheetData } from "./columns";
import { DataTable } from "./data-table";

export default function DemoPage() {
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState<SheetData[] | undefined>(undefined);
  useEffect(() => {
    fetch(
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgftLJhh__nHctI3yWvLdMHrJotreBTtjDnmQ4OngOSzzCYsYDXy7o0Hjz49UWWhKlG34CkMiF6eKXqSkEhtYNnURAaNVU0_S7at_1HwaV2LFSqlAujOXby2-lRsagZ8HfD0p-GhB8Vl0vIC2gDM7uWGbGT9MumKIM16NC41JOxZm4_HYBZXdjxUVGgxydW1w40pNLF_xFFidb-_8N5YspDK-0NzzzNUqUc1WXZWVDLL1Bk-mVEE5de5pPAE6CSvnD15ASWl-kaTRoWqlK5I5ghQg-b2PRGHBM9oTVopI9ZKJsqqzHYjKZhlaXEdBO2iQKmdS0E&lib=MbYpI-uCNuzCSlR-fXAOMhAVPen0JdYkj"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen">
        No Data Found.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
