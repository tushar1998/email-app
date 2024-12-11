import { useQuery } from "@tanstack/react-query";
import SiteHeader from "@/components/site-header";
import { parseAsInteger, useQueryState } from "nuqs";
import Conditional from "./components/utils/conditional";
import { EmailResponse, fetchEmails } from "./services/email";
import EmailItem from "./components/email-item";
import EmailDetail from "./components/email-detail";
import { useLocalStorage } from "@mantine/hooks";
import { searchParams, toggleItem } from "./lib/utils";
import { useEmail } from "./components/hooks/use-email";
import { useCallback, useMemo } from "react";

import EmailPagination from "./components/email-pagination";
import { Icons } from "./lib/icons";

function App() {
  const [page, onChange] = useQueryState("page", { ...parseAsInteger.withDefault(1), clearOnDefault: false });

  const { emailId, setEmailId: setId } = useEmail();

  const [favorite, setFavorite] = useLocalStorage<Array<string>>({ key: "favorite", defaultValue: [] });
  const [read, setRead] = useLocalStorage<Array<string>>({ key: "read", defaultValue: [] });

  const params = searchParams();

  const { data, isPending, isSuccess, isError } = useQuery<EmailResponse>({
    queryKey: ["emails", page],
    queryFn: () => fetchEmails(page),
    select: (data) => ({
      list: data.list.map((email) => {
        return {
          ...email,
          favorite: favorite.includes(email.id),
          read: read.includes(email.id),
        };
      }),
      total: data.total,
    }),
  });

  const getFilteredEmails = useCallback((): EmailResponse => {
    if (params?.filter === "all") return { list: data?.list ?? [], total: data?.total ?? 0 };

    return {
      list:
        data?.list.filter((email) => {
          switch (params?.filter) {
            case "read":
              return email.read;
            case "unread":
              return !email.read;
            case "favorite":
              return email.favorite;
            default:
              return true;
          }
        }) ?? [],
      total: data?.total ?? 0,
    };
  }, [data, params?.filter]);

  const filteredEmails = getFilteredEmails();

  const email = useMemo(() => data?.list.find((email) => email.id === emailId), [data?.list, emailId]);

  const handleEmailItem = (id: string) => {
    setId(id);

    setRead([...new Set([...read, id])]);
  };

  return (
    <>
      <SiteHeader />

      <main className="flex-1 p-8">
        <div className="lg:flex gap-8">
          <Conditional satisfies={isPending}>
            <span className="flex justify-center">
              <Icons.spinner className="size-6 animate-spin" />
            </span>
          </Conditional>
          <section
            data-email={emailId.length > 0}
            data-count={filteredEmails.list.length === 0}
            id="email-list"
            aria-labelledby="email-list-heading"
            className="flex flex-1 flex-col justify-start lg:basis-2/6 data-[count=true]:hidden data-[email=true]:hidden data-[email=true]:lg:block"
          >
            <h2 id="email-list-heading" className="sr-only">
              Inbox Emails
            </h2>
            <ul className="flex flex-col gap-6">
              <Conditional satisfies={isPending}>Loading emails...</Conditional>
              <Conditional satisfies={isSuccess}>
                <>
                  {filteredEmails?.list?.map((email) => {
                    return <EmailItem key={email.id} onClick={() => handleEmailItem(email.id)} {...email} />;
                  })}
                </>
              </Conditional>
              <Conditional satisfies={isError}>
                <p>Something went wrong</p>
              </Conditional>
            </ul>

            <EmailPagination page={page} onChange={onChange} data={data} />
          </section>
          <Conditional satisfies={filteredEmails.list.length === 0 && isSuccess}>
            <p className="text-muted-foreground">Email Empty or Invalid Filter</p>
          </Conditional>
          <Conditional satisfies={email}>
            <section
              data-count={filteredEmails.list.length === 0}
              data-email={emailId}
              className="flex flex-1 min-h-screen flex-col justify-between data-[email=]:hidden data-[count=true]:hidden lg:basis-4/6"
            >
              <Conditional satisfies={isSuccess}>
                <EmailDetail
                  email={data?.list.find((email) => email.id === emailId)}
                  onFavClick={() => {
                    const newFavorite = toggleItem(favorite, emailId);
                    setFavorite(newFavorite);
                  }}
                />
              </Conditional>
            </section>
          </Conditional>
        </div>
      </main>
    </>
  );
}

export default App;
