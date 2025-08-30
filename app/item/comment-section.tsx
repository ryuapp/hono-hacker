import { type Item } from "../../features/hacker-news.ts";
import { timeAgo } from "../../features/hacker-news.ts";

type CommentsProps = {
  comments: Item[];
};

export function CommentSection({ comments }: CommentsProps) {
  return (
    <div class="comments">
      <Comments comments={comments} />
    </div>
  );
}

function Comments({ comments }: CommentsProps) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          comment={comment}
        />
      ))}
    </div>
  );
}

type CommentProps = {
  comment: Item;
};

function Comment(
  this: FC<{ show: boolean; totalCount: number }>,
  props: CommentProps,
) {
  const { comment } = props;
  this.show = true;

  // Count total comments including self and nested
  const countTotalComments = (comments: Item[] | undefined): number => {
    if (!comments || comments.length === 0) return 0;
    return comments.reduce((total, c) => {
      return total + 1 + countTotalComments(c.comments);
    }, 0);
  };

  this.totalCount = 1 + countTotalComments(comment.comments);

  return (
    <>
      <div class="pt-2 text-gray-500 text-xs">
        <span class="mr-1 cursor-pointer text-gray-400 text-sm">▲</span>
        <a class="user mr-1 hover:underline" href={`/user?id=${comment.user}`}>
          {comment.user}
        </a>
        <span class="mr-1">{timeAgo(comment.time)} ago</span>
        <button
          type="button"
          class="hover:cursor-pointer hover:underline"
          onClick={() => {
            this.show = !this.show;
          }}
        >
          {this.computed(() => this.show ? "[-]" : `[${this.totalCount} more]`)}
        </button>
      </div>
      <toggle show={this.show}>
        <div class="break-words text-[0.825rem]">
          {html`
            ${comment.content ?? ""}
          `}
        </div>
        <div class="pl-5">
          {comment.comments && comment.comments.length > 0
            ? <Comments comments={comment.comments} />
            : null}
        </div>
      </toggle>
    </>
  );
}
