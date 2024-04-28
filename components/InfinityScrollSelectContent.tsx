import { ReloadIcon } from "@radix-ui/react-icons";
import { SelectContent } from "./ui/select";

export function InfinityScrollSelectContent({
  isLoading,
  list,
  isValue,
  hasNext = false,
  fetchNext,
  renderItem,
  isFetching,
}: any) {


  

  return (
    <SelectContent id={"scrollableElement"}>
      {isLoading ? (
        <div className="w-full h-72 flex justify-center items-center m-auto">
          <ReloadIcon className="h-4 w-4 m-auto animate-spin" />
        </div>
      ) : list?.length > 0 ? (
        <>
          {list?.map(renderItem)}
          {hasNext && (
            <button
              onClick={() => {
                fetchNext();
              }}
              disabled={!!isFetching}
              className="w-full h-5 flex justify-center text-sm mt-2 items-center m-auto"
            >
              {isFetching ? (
                <ReloadIcon className="h-4 w-4 m-auto animate-spin" />
              ) : (
                "Load more"
              )}
            </button>
          )}
        </>
      ) : (
        <div className="w-full h-72 flex justify-center items-center m-auto">
          <p className="text-sm">
            {isValue ? "Not Found" : "Select first Fund"}
          </p>
        </div>
      )}
    </SelectContent>
  );
}
