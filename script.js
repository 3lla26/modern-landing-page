// Native dialogs keep escape details accessible to keyboard and touch users.
const dialogs = [...document.querySelectorAll('dialog')];
function syncDialog() {
  const selected = dialogs.find(dialog => `#${dialog.id}` === location.hash);
  dialogs.forEach(dialog => {
    if (dialog !== selected && dialog.open) dialog.close();
  });
  if (selected && !selected.open) selected.showModal();
}
window.addEventListener('hashchange', syncDialog);
dialogs.forEach(dialog => {
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    location.hash = 'escapes';
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) location.hash = 'escapes';
    }
  });
});
syncDialog();
