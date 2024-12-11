import { Email, fetchEmail } from "@/services/email";
import { useQuery } from "@tanstack/react-query";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useMemo } from "react";
import Conditional from "./utils/conditional";
import { useEmail } from "./hooks/use-email";
import { Icons } from "@/lib/icons";

interface EmailDetailProps {
  email?: Email;
  onFavClick: () => void;
}

export default function EmailDetail({ email, onFavClick }: EmailDetailProps) {
  const { emailId, setEmailId } = useEmail();

  console.log("emailId", emailId, email);

  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["email", emailId],
    queryFn: () => fetchEmail(emailId),
    enabled: emailId.length > 0,
  });

  const html = useMemo(() => {
    if (data?.body) {
      const sanitizedHtml = DOMPurify.sanitize(data?.body);
      return parse(sanitizedHtml);
    }
    return <></>;
  }, [data?.body]);

  return (
    <div className={cn("min-w-fit")}>
      <Card className={cn(`p-6 transition-colors flex gap-4 rounded-md pr-10 md:pr-20`)}>
        <Avatar className="w-12 h-12 bg-accent text-white">
          <AvatarFallback className="bg-accent">{email?.from.name[0].toUpperCase() ?? ""}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex justify-between">
            <span>
              <h1 className="text-xl font-medium text-gray-700">{email?.subject}</h1>
              <time className="text-sm text-muted-foreground">
                {new Date(email?.date ?? 0).toLocaleString("en-IN").replace(", ", " ")}
              </time>
            </span>
            <span className="relative lg:block">
              <Button
                className={cn("h-6 rounded-2xl text-sm p-3.5 cursor-pointer bg-accent hover:bg-accent")}
                size="default"
                onClick={onFavClick}
              >
                Mark as Favorite
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={cn("rounded-full h-6 w-6 bg-background absolute bottom-12 md:right-[-75px] right-[-35px]")}
                onClick={() => setEmailId("")}
              >
                <Icons.x className="stroke-muted-foreground" size={12} />
              </Button>
            </span>
          </div>
          <Conditional satisfies={isPending}>
            <p className="mt-4 text-muted-foreground">Loading Details...</p>
          </Conditional>
          <Conditional satisfies={isSuccess}>
            <div className="mt-4 text-muted-foreground [&>div]:space-y-6">{html}</div>
          </Conditional>
        </div>
      </Card>
    </div>
  );
}
