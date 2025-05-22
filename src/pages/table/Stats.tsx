import type { SheetData } from "./columns";

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
    <div className="*:data-[slot=card]:shadow-xs xl:grid-cols-3 5xl:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
      {/* <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Selected Score</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalSelectedScore ? totalSelectedScore?.toFixed(2) : "-"}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +12.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Helper</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {totalHelper?.toFixed(2)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-3" />
              -20%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card> */}
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Aggregated Score</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {aggregatedScore?.toFixed(2)}%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${
                aggregatedScore >= 75
                  ? "P1 border-green-500 text-green-500"
                  : aggregatedScore >= 50
                  ? "P2 border-amber-500 text-amber-500"
                  : "P3 border-red-500 text-red-500"
              }`}
            >
              {aggregatedScore >= 75 ? (
                <TrendingUpIcon className="size-3" />
              ) : aggregatedScore >= 50 ? (
                ""
              ) : (
                <TrendingDownIcon className="size-3" />
              )}

              {aggregatedScore >= 75
                ? "P1"
                : aggregatedScore >= 50
                ? "P2"
                : "P3"}
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex items-center gap-2 font-medium">
            {aggregatedScore >= 75
              ? "🌟 High Priority"
              : aggregatedScore >= 50
              ? "🟡 Medium Priority"
              : "🔴 Low Priority"}
            {aggregatedScore >= 75 ? (
              <TrendingUpIcon className="size-4 text-green-500" />
            ) : aggregatedScore >= 50 ? (
              ""
            ) : (
              <TrendingDownIcon className="size-4 text-red-500" />
            )}
          </div>
          {/* <div className="text-muted-foreground">Engagement exceed targets</div> */}
        </CardFooter>
      </Card>
      {/* <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            4.5%
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card> */}
    </div>
  );
};

export default Stats;
