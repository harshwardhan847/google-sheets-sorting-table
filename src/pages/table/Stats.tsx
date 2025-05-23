import type { SheetData } from "./columns";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
type Props = {
  selectedRows: SheetData[] | undefined;
  data: SheetData[] | undefined;
};

const Stats = ({ selectedRows, data }: Props) => {
  const totalSelectedScore = selectedRows?.length
    ? selectedRows
        ?.map((val) => val["Adjusted Score"])
        ?.reduce((previous, curr) => {
          return previous + curr;
        })
    : 0;

  const totalHelper =
    data
      ?.filter((data) =>
        data?.["Helper Column"] ? data?.["Helper Column"] : 0
      )
      ?.map((data) => Number(data["Helper Column"]))
      ?.reduce((previous, curr) => {
        if (!previous || !curr) {
          return 0;
        }
        return previous + curr;
      }) ?? 0;

  const aggregatedScore = (totalSelectedScore / totalHelper) * 100;

  if (!selectedRows?.length) {
    return (
      <div className="grid md:grid-cols-3">
        <Card className="@container/card min-h-40 flex items-center justify-center">
          <CardContent className="text-xl font-semibold">
            Select some Factors
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <>
      <div className="*:data-[slot=card]:shadow-xs w-sm max-w-sm *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Aggregated Score</CardDescription>
            <CardTitle className="@[250px]/card:text-7xl text-5xl font-semibold tabular-nums flex gap-4">
              <div>{aggregatedScore?.toFixed(2)}%</div>
              <div className="flex items-end justify-center mb-2">
                <Badge
                  variant="outline"
                  className={`flex gap-1 rounded-lg text-base ${
                    aggregatedScore >= 75
                      ? "P1 border-green-500 text-green-500"
                      : aggregatedScore >= 50
                      ? "P2 border-amber-500 text-amber-500"
                      : "P3 border-red-500 text-red-500"
                  }`}
                >
                  {aggregatedScore >= 75 ? (
                    <TrendingUpIcon className="size-5" />
                  ) : aggregatedScore >= 50 ? (
                    ""
                  ) : (
                    <TrendingDownIcon className="size-5" />
                  )}

                  {aggregatedScore >= 75
                    ? "P1"
                    : aggregatedScore >= 50
                    ? "P2"
                    : "P3"}
                </Badge>
              </div>
            </CardTitle>
            <div className="text-base">
              {aggregatedScore >= 75
                ? "🟢 High Priority"
                : aggregatedScore >= 50
                ? "🟡 Medium Priority"
                : "🔴 Low Priority"}
            </div>
          </CardHeader>
        </Card>
      </div>
      <ul className="flex items-start justify-end flex-col text-xs gap-2">
        <li>P1 (🟢 High Priority): Score &gt; 75% </li>
        <li>P2 (🟡 Medium Priority): 50–75%</li>
        <li>P3 (🔴 Low Priority): &lt; 50%</li>
      </ul>
    </>
  );
};

export default Stats;
