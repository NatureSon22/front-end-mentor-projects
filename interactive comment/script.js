const mainCommentBtn = document.querySelector('.main button');

let content = [
    {
        commentTab: document.querySelector('.comment-section'),
        commentBar: document.querySelector('.main textarea'),
        userImg: document.querySelector('.main img')
    }, 
]
let mainComments = document.querySelectorAll('.comment-section__tab');


const toggleActive = (element) => {
    element.classList.toggle('active');
}

const voteCount = (voteup, votedown, score) => {
    let commentScore = Number(score.textContent);
    voteup.addEventListener('click', () => {
        commentScore++;
        score.textContent = commentScore;
    })

    votedown.addEventListener('click', () => {
        commentScore--;
        score.textContent = commentScore;
    })
}

const createMainComment = ({commentTab, commentBar, userImg}, { replySection, commentBox } = {}, [replyClass, editClass, sendReplyButton, updateBtn] = []) => {
    const div = document.createElement('div');

    if(!commentBar.value) {
        return;
    }

    if(commentTab.querySelector('*')) {
        commentTab.classList.add('active');
    }

    // [remeber to add time]
    div.innerHTML = `
        <section class="comment-section__tab">
            <section class="comment-section__container">
                <div class="comment-section__container-vote">
                    <img src="images/icon-plus.svg" alt="">
                    <p class="comment-section__container-number">0</p>
                    <img src="images/icon-minus.svg" alt="">
                </div>

                <div class="comment-section__container-comment">
                    <div class="comment-section__container-profile">
                        <img src="${userImg.src}" alt="">
                        <p>juliusomo</p>
                        <p class="${replyClass}">you</p>
                        <p>just now</p>
                    </div>

                    <p class="comment-section__container-main-comment">
                    ${commentBar.value}
                    </p>
                </div>

                <div class="comment-section__container-option ${editClass}">
                    <div class="comment-section__container-reply">
                        <img src="images/icon-reply.svg" alt="">
                        <p>Reply</p>
                    </div>

                    <div class="comment-section__container-delete">
                        <img src="images/icon-delete.svg" alt="">
                        <p>Delete</p>
                    </div>

                    <div class="comment-section__container-edit">
                        <img src="images/icon-edit.svg" alt="">
                        <p>Edit</p>
                    </div>
                </div>
            </section>
            <!-- container for the replies -->

            <section class="replies-section__container">
                <section class="comment-container comment">
                    <img src="images/avatars/image-juliusomo.png" alt="profile picture of the user">
                    <textarea class="comment-bar" placeholder="Add a comment..."></textarea>
                    <button class="reply-btn">REPLY</button>
                    <button id="update-btn">UPDATE</button>
                </section>
            </section>
        </section>
    `;

    if(commentBox) {
        commentTab.append(div, commentBox);
    }else {
        commentTab.append(div);
    }

    console.log(replySection)
    if(replySection) {
        const reply = replySection.querySelector('.comment-section__container-reply');
        const deleteButton = div.querySelector('.comment-section__container-delete');
        const editButton = div.querySelector('.comment-section__container-edit');
        const comment = div.querySelector('.comment-section__container-main-comment');

        reply.addEventListener('click', () => {
            const profile = replySection.querySelector('.comment-section__container-profile');
            const name = profile.querySelector('p');
            commentBar.value = `@${name.textContent}, `;
            console.log(commentBar.value)

            if(!commentBox.classList.contains('active')) {
                toggleActive(commentBox);
            }

            if(updateBtn.classList.contains('active')) {
                toggleActive(updateBtn)
            }
        })

        deleteButton.addEventListener('click', () => {
            commentTab.removeChild(div);
        });
        
        editButton.addEventListener('click', () => {  
            toggleActive(sendReplyButton);
            toggleActive(updateBtn);
            commentBar.value = comment.innerText;
        });

        updateBtn.addEventListener('click', () => {
            comment.innerText = commentBar.value;
            toggleActive(sendReplyButton);
            toggleActive(updateBtn);
            commentBar.value = '';
        });
    }

    const voteup = div.querySelector('.comment-section__container-vote > img:nth-child(1)');
    const score = div.querySelector('.comment-section__container-vote p');
    const votedown = div.querySelector('.comment-section__container-vote > img:nth-child(3)');

    voteCount(voteup, votedown, score);

    commentBar.value = '';
    mainComments = document.querySelectorAll('.comment-section__tab');
}


const setupCommentInteractions = () =>  {
    mainComments.forEach(comment => {
        const voteup = comment.querySelector('.comment-section__container-vote > img:nth-child(1)');
        const score = comment.querySelector('.comment-section__container-vote p');
        const votedown = comment.querySelector('.comment-section__container-vote > img:nth-child(3)');
        const userName = comment.querySelector('.comment-section__container-profile p');
        const replyButton = comment.querySelector('.comment-section__container-reply');
        const commentBox = comment.querySelector('.comment-container'); 
        const sendReplyButton = commentBox.querySelector('button');
        const updateBtn = commentBox.querySelector('#update-btn');
        const replySection = comment.querySelector('.replies-section__container');
        const commentArea = commentBox.querySelector('textarea');

        replyButton.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            toggleActive(commentBox);
            commentArea.value = `@${userName.textContent}, `;
        })
        
        voteCount(voteup, votedown, score);
        
        sendReplyButton.addEventListener('click', () => {
            const infoComment = {
                commentTab: replySection,
                commentBar: commentArea,
                userImg: commentBox.querySelector('img')
            }

            const containers = { replySection, commentBox };
            createMainComment(infoComment, containers, ['reply-tag active', 'active', sendReplyButton, updateBtn]);
        })

        const reply = replySection.querySelectorAll('.comment-section__container-reply');
        reply.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                const profile = replySection.querySelectorAll('.comment-section__container-profile')[index];
                const name = profile.querySelector('p');
                commentArea.value = name.textContent;

                if(!commentBox.classList.contains('active')) {
                    toggleActive(commentBox);
                }
            })
        });
    })
};


mainCommentBtn.addEventListener('click', () => {
    const infoComment = {
        commentTab: document.querySelector('.comment-section'),
        commentBar: document.querySelector('.main textarea'),
        userImg: document.querySelector('.main img')
    }
    
    console.log(infoComment.commentBar.value)
    createMainComment(infoComment);
    setupCommentInteractions();
});

setupCommentInteractions();