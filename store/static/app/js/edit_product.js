document.addEventListener('DOMContentLoaded', () => {
    
function bindPreview(inputId, imgId, placeholderId) {
    const input = document.getElementById(inputId);
    const img = document.getElementById(imgId);
    const placeholder = document.getElementById(placeholderId);

    if (!input || !img) return;

    input.addEventListener("change", function () {
        const file = this.files && this.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            img.src = e.target.result;
            img.classList.remove("hidden");

            if (placeholder) {
                placeholder.classList.add("hidden");
            }
        };

        reader.readAsDataURL(file);
    });
}

    bindPreview("image1", "preview1", null);
    bindPreview("image2", "preview2", "placeholder2");
    bindPreview("image3", "preview3", "placeholder3");


// handle mark as draft

const setAsDraft = document.querySelector('.mark_as_draft_label')
const draft_color = 'bg-gray-200'
const active_color = 'bg-gray-800'

const setAsFeatured = document.querySelector('.mark_as_featured_label')


setAsFeatured.addEventListener('click', () => {
    if(setAsFeatured.innerText.toLowerCase() === 'featured') {
        setAsFeatured.innerText = 'Not Featured';
        setAsFeatured.classList.remove('text-white')
        setAsFeatured.classList.remove(active_color)
        setAsFeatured.classList.add(draft_color)
    } else {
        setAsFeatured.innerText = 'Featured';
        setAsFeatured.classList.add('text-white')
        setAsFeatured.classList.remove(draft_color)
        setAsFeatured.classList.add(active_color)
    }
})


setAsDraft.addEventListener('click', () => {
    if(setAsDraft.innerText.toLowerCase() === 'set as draft') {
        setAsDraft.innerText = 'Set as Active';
        setAsDraft.classList.remove('text-white')
        setAsDraft.classList.remove(active_color)
        setAsDraft.classList.add(draft_color)
    } else {
        setAsDraft.innerText = 'Set as Draft';
        setAsDraft.classList.add('text-white')
        setAsDraft.classList.remove(draft_color)
        setAsDraft.classList.add(active_color)
    }
})

const question_popup = document.querySelector('.delete-question')
const questionBtn = document.querySelector('.delete-question-btn')

const noBtn = document.querySelector('.no')

questionBtn.addEventListener('click', () => {
    if (question_popup.classList.contains('hidden')) {
        question_popup.classList.remove('hidden');
    }
})


noBtn.addEventListener('click', () => {
    question_popup.classList.add('hidden');
})

})