document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#FormFilterSamples');
  if (!form) return;

  const selects = form.querySelectorAll('select');
  selects.forEach(select => {
    select.addEventListener('change', filterSamples);
  });

  filterSamples();
});

function filterSamples() {
  const form = document.querySelector('#FormFilterSamples');
  if (!form) return;

  const values = Object.fromEntries(new FormData(form).entries());
  const anchors = document.querySelectorAll('.sampleAnchor');

  const fieldMap = {
    welder: 'welder',
    process: 'process',
    material: 'material',
    thickness: 'thickness',
    joint: 'joint'
  };

  anchors.forEach(anchor => {
    const card = anchor.querySelector('.sampleCard');
    if (!card) return;

    let visible = true;

    for (const [field, selected] of Object.entries(values)) {
      if (selected === 'All') continue;

      const key = fieldMap[field];
      const dataValue = (card.dataset[key] || "").trim().toLowerCase();
      const selectedValue = selected.trim().toLowerCase();

      if (dataValue !== selectedValue) {
        visible = false;
        break;
      }
    }

    anchor.classList.toggle('hidden', !visible);
  });
}
