// feed
let postContainer = document.getElementById('postContainer');
// let clearFeed = document.getElementById('clearFeed');

// populate the feed
const populateFeed = async () => {
    const postsRes = await fetch("/posts");
    if(!postsRes.headers.get("content-type").includes("application/json")) {
        window.location.href = "/login.html";
    }
    const posts = await postsRes.json();
    if (posts.length > 0) {
        let newPostHTML = "";
        for (const post of posts) {
         
            newPostHTML +=
            `
            <div class="card" id=${post._id}>
            <div class="col-sm-4">
                <br>
                <img src= ${post.imageUrl} class="card-img-top" class="img-fluid" height=auto alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title"> ${post.recipeName} </h5>
                <p class="card-text">
                <p> Posted By: ${post.author} </p>
                <p> Ingredients: ${post.ingredients} </p>
                <p> Time (in minutes): ${post.time} </p>
                <p> Temp (in degrees Fahrenheit): ${post.temp} </p>
                <p> Flip?: ${post.flip} </p>
                <p> Flip time (in minutes): ${post.flipTime} </p>
                <p> Dietary Compliance <br> ${post.dietaryCompliance[0]} <br> ${post.dietaryCompliance[1]} </p>
                <p> Additional Instructions: ${post.instructions} </p>
                </p>
                <a href="#" class="btn btn-primary likeButton" data-post-id=${post._id} likes=${post.likes}> Like: ${post.likes} </a>
                <a href="#" class="btn btn-primary deleteButton" data-post-id=${post._id}> Delete </a>
            </div>
            </div>
            <br>
            `;
        }

        postContainer.innerHTML = newPostHTML;
    }
    else{
        postContainer.innerHTML = '';
    }
};

// clearFeed.addEventListener('click', async (event) => {
//     await db.destroy();
//     db = new PouchDB("postsTemp");
//     location.reload();
// });

window.addEventListener("load", async (event) => {

    await populateFeed();
    let deleteButtons = document.querySelectorAll('.deleteButton');
    let likeButtons = document.querySelectorAll('.likeButton');

    // like post
    likeButtons.forEach(
        async b => {
            b.addEventListener('click', async (event) => {

                event.preventDefault();
                // get the post ID from the data-post-id attribute of the button
                let postId = event.target.dataset.postId;
    
                await fetch(`/posts/${postId}`, {
                    method: 'PUT'
                    // headers: { 'Content-Type': 'application/json' },
                });
                window.location.reload();
                
            });
        }
    );
    
    // delete post
    deleteButtons.forEach(button => {
        button.addEventListener('click', async event => {
            event.preventDefault();  
            let postId = event.target.dataset.postId;
            await fetch(`/posts/${postId}`, { method: "DELETE" });
            //await populateFeed();
            window.location.reload();
        });
    });
});