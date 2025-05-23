import { useEffect, useState } from "react";
import { columns, type SheetData } from "./columns";
import { DataTable } from "./data-table";
import Stats from "./Stats";

export default function DemoPage() {
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState<SheetData[] | undefined>(undefined);
  useEffect(() => {
    fetch(
      "https://script.google.com/macros/s/AKfycbwvdxXP_GHoQS1dApnFEkgMdy0cQarr0fLmW-7AQkAKUWlO1Rdzc9519Ru3iTSWNsON/exec?action=read&path=Scoring Lookup"
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

  const selectedRows = data?.filter((val) => val["Data Flag"]);

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
      <div className="w-full flex gap-4">
        <Stats selectedRows={selectedRows} data={data} />
      </div>
      <DataTable columns={columns} tableData={data} setTableData={setData} />
    </div>
  );
}
