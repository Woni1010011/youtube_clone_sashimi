for (let i = 0; i < 12; i++) {
    let newItemDiv = document.createElement('div');
    newItemDiv.classList.add('item'); // Fix: Use classList.add to add the class
    newItemDiv.textContent = 'item' + (i + 1);

    let newLink = document.createElement('a');
    newLink.appendChild(newItemDiv);

    let topmenuList = document.querySelector('.topmenu_list');
    let itemScroll = topmenuList.querySelector('.item_scroll'); // Fix: Correct the class name to 'item_scroll'
    itemScroll.appendChild(newLink);
}