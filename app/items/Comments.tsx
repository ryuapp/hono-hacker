import { useState } from "hono/jsx";
import { type Item } from "../../utils/types.ts";
import { timeAgo } from "../../utils/api.ts";

type CommentsProps = {
  comments?: Item[];
};

export function Comments(props: CommentsProps) {
  const { comments } = props;

  return (
    comments && comments.length > 0
      ? (
        <div>
          {comments.map((comment) => <Comment comment={comment} />)}
        </div>
      )
      : null
  );
}

type CommentProps = {
  comment: Item;
};

function Comment(props: CommentProps) {
  const { comment } = props;
  const [open, setOpen] = useState(true);

  return (
    <>
      <div class="text-xs text-gray-500 pt-2 pb-1">
        <span class="cursor-pointer mr-1 text-sm text-gray-300">▲</span>
        <a class="hover:underline" href={`/users/${comment.user}`}>
          {comment.user}
        </a>{" "}
        {timeAgo(comment.time)} ago{" "}
        <button onClick={() => setOpen(!open)}>{open ? "[-]" : `[+]`}</button>
      </div>
      {open
        ? (
          <>
            <div
              class="text-[0.825rem] break-words"
              dangerouslySetInnerHTML={{
                __html: comment.content ?? "",
              }}
            />
            <div class="pl-5">
              <Comments comments={comment.comments} />
            </div>
          </>
        )
        : null}
    </>
  );
}
