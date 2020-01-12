class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.stateLabel = document.querySelector('#stateLabel');
    this.instructLabel = document.querySelector('#instructLabel');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.forState = 'add';
  }

  showPosts(posts) {
    let output = '';

    posts.forEach((post) => {
      output += `
        <div class="card border-light mb-3 mx-auto" style="max-width: 40rem;">
          <div class="card-body">
            <h2 class="card-title">${post.title}</h2>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement('div');
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.postsContainer');
    // Get posts
    const posts = document.querySelector('#posts');
    // Insert alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }

  // Clear ID Hidden value
  clearIdinput() {
    this.idInput.value = ''
  }

  changeFormState(type) {
    if (type === 'edit') {
      this.stateLabel.textContent = 'Edit';

      this.instructLabel.textContent = 'Edit your Post!';

      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.ClassName = 'post-submit btn btn-warning btn-block';

      // Create Cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-danger btn-block'
      button.appendChild(document.createTextNode('Cancel Edit'));

      // Get parent
      const cardForm = document.querySelector('.card-form');
      // Get element to insert before
      const formEnd = document.querySelector('.form-end');
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = 'Post it';
      this.postSubmit.className = 'post-submit btn btn-success btn-block';
      this.clearFields();
      // Remove Cancel Btn
      if (document.querySelector('.post-cancel')) {
        this.stateLabel.textContent = 'Jot It Down'
        this.instructLabel.textContent = `What's on your mind?`
        document.querySelector('.post-cancel').remove();
      }

      this.clearIdInput();
    }
  }
}

export const ui = new UI();