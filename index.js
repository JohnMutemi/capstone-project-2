document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveNewPost');
    const tableBody = document.querySelector('tbody');
    const createNewPost = document.getElementById('createNewPost');
    

    saveButton.addEventListener('click', () => {
        const author = document.getElementById('author').value;
        const topic = document.getElementById('topic').value;
        const blogBody = document.getElementById('blogBody').value;
        const date = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format

        // Find the last row in the table to determine the position to insert the new row
        const lastRow = tableBody.lastElementChild;

        // Create new table row
        const newRow = document.createElement('tr');



        // Create table cells for date, thread (topic), author, status, and unread
        const dateCell = document.createElement('td');
        dateCell.textContent = date;
        const threadCell = document.createElement('td');
        const threadLink = document.createElement('a');
        threadLink.href = '#';
        threadLink.textContent = topic;
        threadLink.addEventListener('click', () => {
            // Display the post content when thread link is clicked
            alert('Opening blog content: ' + blogBody());
        })
        threadCell.appendChild(threadLink);
        const authorCell = document.createElement('td');
        authorCell.textContent = author;
        const statusCell = document.createElement('td');
        statusCell.textContent = 'Active'; // Assuming all new posts are active
        const unreadCell = document.createElement('td');
        unreadCell.textContent = 'Yes'; // Assuming all new posts are unread

        // Append cells to the new row
        newRow.appendChild(dateCell);
        newRow.appendChild(threadCell);
        newRow.appendChild(authorCell);
        newRow.appendChild(statusCell);
        newRow.appendChild(unreadCell);

        // Insert the new row below the existing rows
        if (lastRow) {
            tableBody.insertBefore(newRow, lastRow.nextSibling);
        } else {
            tableBody.appendChild(newRow);
        }

        // Reset form fields
        document.getElementById('author').value = '';
        document.getElementById('topic').value = '';
        document.getElementById('blogBody').value = '';

        // Hide the "Create New Post" section after saving the post
        createNewPost.style.display = 'none';

        // Add the new post to the server
        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: blogBody,
                author: author,
                image: '' // Assuming no image for now
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add post');
            }
            return response.json();
        })
        .then(data => {
            console.log('New post added:', data);
            // Optionally, you can update your UI here
        })
        .catch(error => {
            console.error('Error adding post:', error);
        });
    });

    const addNewPostButton = document.getElementById('addNewPostButton');
    addNewPostButton.addEventListener('click', () => {
        createNewPost.style.display = 'block';
    });

    const cancelNewPostButton = document.getElementById('cancelNewPost');
    cancelNewPostButton.addEventListener('click', () => {
        createNewPost.style.display = 'none';
    });
});
