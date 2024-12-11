import { Email } from "@/services/email";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Conditional from "./utils/conditional";
import { useEmail } from "./hooks/use-email";

interface EmailItemProps extends Email {
  emailId?: string;
  onClick?: () => void;
  favorite: boolean;
}

export default function EmailItem({
  id,
  subject,
  short_description,
  from,
  date,
  favorite,
  read,
  onClick,
}: EmailItemProps) {
  const { emailId } = useEmail();
  return (
    <Card
      data-read={read}
      data-active={emailId === id}
      className={cn(
        `p-4 hover:ring-2 hover:ring-slate-300 transition-colors flex gap-4 rounded-md data-[active=true]:border-accent data-[read=true]:bg-muted/80`
      )}
      onClick={onClick}
    >
      <Avatar className="w-12 h-12 bg-accent text-white">
        <AvatarFallback className="bg-accent">{from.name[0].toUpperCase() ?? "F"}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="text-sm">
          <span className="text-muted-foreground">From:</span> {from.name}{" "}
          <span className="text-foreground">&lt;{from.email}&gt;</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Subject:</span> <span className="text-foreground">{subject}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-1">{short_description}</p>
        <div className="flex items-center mt-1">
          <span className="text-xs text-muted-foreground">
            {new Date(date).toLocaleString("en-IN").replace(", ", " ")}
          </span>
          <Conditional satisfies={favorite}>
            <p className="ml-6 text-xs font-bold text-accent hover:text-accent flex items-center gap-1 transition-colors">
              Favorite
            </p>
          </Conditional>
        </div>
      </div>
    </Card>
  );
}
