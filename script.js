let { comments, currentUser } = {
  currentUser: {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp",
    },
    username: "juliusomo",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "./images/avatars/image-maxblagun.png",
          webp: "./images/avatars/image-maxblagun.webp",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
          createdAt: "1 week ago",
          score: 4,
          replyingTo: "maxblagun",
          user: {
            image: {
              png: "./images/avatars/image-ramsesmiron.png",
              webp: "./images/avatars/image-ramsesmiron.webp",
            },
            username: "ramsesmiron",
          },
        },
        {
          id: 4,
          content:
            "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          createdAt: "2 days ago",
          score: 2,
          replyingTo: "ramsesmiron",
          user: {
            image: {
              png: "./images/avatars/image-juliusomo.png",
              webp: "./images/avatars/image-juliusomo.webp",
            },
            username: "juliusomo",
          },
        },
      ],
    },
  ],
};

console.log(comments);

const upvotedComments = [];

const deleteCommentPopup = document.querySelector(".delete-comment-popup");

function showDeleteComment(id) {
  console.log("twerking");
  deleteCommentPopup.style.visibility = "visible";
  deleteCommentPopup.querySelector("button:nth-child(2)").onclick =
    function () {
      console.log(findCommentById(id));
      for (let comm of comments) {
        if (comm.id === id) {
          comments = comments.filter((c) => c.id !== id);
        } else if (comm.replies) {
          for (let reply of comm.replies) {
            if (reply.id === id) {
              comm.replies = comm.replies.filter((c) => c.id !== id);
            }
          }
        }
      }
      displayAllComments();
      disappearDeleteComment();
    };
  deleteCommentPopup.querySelector("button:nth-child(1)").onclick =
    function () {
      disappearDeleteComment();
    };
}
function disappearDeleteComment() {
  deleteCommentPopup.style.visibility = "hidden";
}

function addCommentToDom(
  {
    id,
    content,
    createdAt,
    replyingTo,
    score,
    user: {
      image: { png },
      username,
    },
    replies,
  },
  root
) {
  console.log(replies);
  const newComment = document.createElement("div");
  newComment.className = "comment";
  newComment.attributes["data-id"] = id;
  const commentDiv = `
    <div class="upvote">
      <svg id="upvote-btn" class=${
        upvotedComments.find((vote) => vote.id === id)?.status === "upvoted"
          ? "upvoted width=11"
          : "width=11"
      } width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
      <span>${score}</span>
      <svg id="downvote-btn" class=${
        upvotedComments.find((vote) => vote.id === id)?.status === "downvoted"
          ? "downvoted width=11"
          : "width=11"
      }  width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
    </div>
    <div class="comment-body">
      <div class="comment-info">
        <div class="comment-meta">
          <img src="${png}" />
          <h2>${username}${
    username === currentUser.username ? `<span>you</span>` : ""
  }</h2>
          <h2>${createdAt}</h2>
        </div>
        <div class="comment-actions">
            ${
              username === currentUser.username
                ? `<span class="delete"
                ><svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                Delete</span
              ><span class="edit"
              ><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
              Edit</span
            >`
                : `<span class="reply"
            ><svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                fill="#5357B6"
              />
            </svg>
            Reply</span
          >`
            }
        </div>
      </div>
      <div class="message">
      ${
        replyingTo
          ? `<p><span>@${replyingTo}</span>${content}</p>`
          : `<p>${content}</p`
      }
      </div>
    </div>`;
  newComment.innerHTML = commentDiv;
  const replyButton = newComment.querySelector(".reply");
  if (replyButton) {
    replyButton.onclick = function () {
      addReplyBoxToDom(newComment, findParentComment(id), username);
      console.log("hello", id);
    };
  }
  const upvoteBtn = newComment.querySelector("#upvote-btn");
  const downvoteBtn = newComment.querySelector("#downvote-btn");
  upvoteBtn.onclick = function () {
    const commentToUpvote = findCommentById(id);
    const hasUpvoted = upvotedComments.find((vote) => vote.id === id);
    if (!hasUpvoted || (hasUpvoted && hasUpvoted.status !== "upvoted")) {
      if (hasUpvoted) {
        hasUpvoted.status = "upvoted";
        commentToUpvote.score += 2;
      } else {
        upvotedComments.push({ id, status: "upvoted" });
        commentToUpvote.score += 1;
      }
    }
    displayAllComments();
  };
  downvoteBtn.onclick = function () {
    const commentToUpvote = findCommentById(id);
    const hasUpvoted = upvotedComments.find((vote) => vote.id === id);
    if (!hasUpvoted || (hasUpvoted && hasUpvoted.status !== "downvoted")) {
      if (hasUpvoted) {
        hasUpvoted.status = "downvoted";
        commentToUpvote.score -= 2;
      } else {
        upvotedComments.push({ id, status: "downvoted" });
        commentToUpvote.score -= 1;
      }
    }
    displayAllComments();
  };
  const commentDeleteIcon = newComment.querySelector(".delete");
  if (commentDeleteIcon) {
    commentDeleteIcon.onclick = function () {
      console.log("he");
      showDeleteComment(id);
    };
  }
  const commentEditIcon = newComment.querySelector(".edit");
  if (commentEditIcon) {
    commentEditIcon.onclick = function () {
      const msgBox = newComment.querySelector(".message");
      const msg = msgBox.querySelector("p").innerText;
      msgBox.innerHTML = "";
      msgBox.className = "update-message";
      const updateMessageState = `<textarea></textarea><button>update</button>`;
      msgBox.innerHTML = updateMessageState;
      const textarea = msgBox.querySelector("textarea");
      const updateBtn = msgBox.querySelector("button");
      textarea.value = msg
        .split(" ")
        .filter((msgPart) => !msgPart.includes("@"))
        .join(" ");
      updateBtn.onclick = function () {
        findCommentById(id).content = textarea.value;
        displayAllComments();
      };
      console.log(msg);
    };
  }
  root.appendChild(newComment);
  if (replies) {
    const newCommentChain = document.createElement("div");
    newCommentChain.className = "comment-chain";
    for (let reply of replies) {
      addCommentToDom(reply, newCommentChain);
    }
    root.appendChild(newCommentChain);
  }
}

function addReplyBoxToDom(root, parentComment, replyingTo) {
  //   console.log(replyCommentId);
  const newReplyBox = document.createElement("div");
  newReplyBox.className = "reply-box";
  const replyBoxDiv = `
    <img src="${currentUser.image.png}">
    <textarea placeholder="Add a comment...."></textarea>
    <button>${parentComment ? "reply" : "send"}</button>
    `;
  newReplyBox.innerHTML = replyBoxDiv;
  const submitBtn = newReplyBox.querySelector("button");
  submitBtn.onclick = function () {
    const commentContent = newReplyBox.querySelector("textarea").value;
    console.log("clicked", commentContent);
    const newReply = {
      id: randomId(),
      content: commentContent,
      createdAt: "Moments ago....",
      replyingTo,
      score: 0,
      user: currentUser,
    };
    console.log(newReply);
    if (parentComment) {
      parentComment.replies.push(newReply);
    } else {
      comments.push(newReply);
    }
    displayAllComments();
  };
  root.parentNode.insertBefore(newReplyBox, root.nextSibling);
  //   root.appendChild(newReplyBox);
}

function displayAllComments() {
  const commentsSection = document.querySelector(".comments");
  commentsSection.innerHTML = "";
  for (let comment of comments) {
    addCommentToDom(comment, document.querySelector(".comments"));
  }
}

function findParentComment(id) {
  for (let comm of comments) {
    console.log(comm.id, id);
    if (comm.id === id) {
      return comm;
    } else if (comm.replies) {
      for (let reply of comm.replies) {
        console.log(reply.id, id, comm);
        if (reply.id === id) {
          return comm;
        }
      }
    }
  }
}

function findCommentById(id) {
  for (let comm of comments) {
    if (comm.id === id) {
      return comm;
    } else if (comm.replies) {
      for (let reply of comm.replies) {
        if (reply.id === id) {
          return reply;
        }
      }
    }
  }
}

function randomId() {
  const letters = "abcdefghi";
  const numbers = "123456789";
  const total = letters + numbers;
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += total[Math.floor(Math.random() * total.length)];
  }
  return id;
}

displayAllComments();

addReplyBoxToDom(document.querySelector(".comments"));
