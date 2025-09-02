// Career Center interactivity (no server required)
// - active sidebar handling
// - simple card/button actions
// - resume upload demo

document.addEventListener('DOMContentLoaded', () => {
  // active sidebar link highlighting (if user clicks other links)
  const links = document.querySelectorAll('.sidebar a');
  links.forEach(l => {
    l.addEventListener('click', function(e){
      // leave default navigation; still visually update active class
      links.forEach(x => x.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Card click behaviors (example)
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') card.click();
    });
  });

  // View/Apply buttons
  document.querySelectorAll('.apply-btn, .btn-small').forEach(b => {
    b.addEventListener('click', (e) => {
      const role = e.currentTarget.dataset.role || e.currentTarget.textContent.trim();
      alert(`Opening details for: ${role}\n\n(This is demo UI. Integrate with job details page or modal.)`);
    });
  });

  // Post/View actions (demo)
  document.getElementById('postJobBtn')?.addEventListener('click', () => {
    alert('Post Job flow (demo). In production, show a form to submit job details.');
  });
  document.getElementById('viewAllJobs')?.addEventListener('click', () => {
    alert('Open Job Board (demo).');
  });
  document.getElementById('postInternBtn')?.addEventListener('click', () => {
    alert('Post Internship (demo).');
  });
  document.getElementById('viewAllInterns')?.addEventListener('click', () => {
    alert('View all internships (demo).');
  });

  // Resume upload demo
  const resumeInput = document.getElementById('resumeInput');
  const uploadBtn = document.getElementById('uploadResume');
  uploadBtn?.addEventListener('click', () => {
    if (!resumeInput || !resumeInput.files || resumeInput.files.length === 0) {
      alert('Please choose a resume file first (pdf/doc/docx).');
      return;
    }
    const file = resumeInput.files[0];
    // simple size check (demo)
    if (file.size > 5 * 1024 * 1024) {
      alert('File too large. Please upload max 5MB.');
      return;
    }
    // In real app: upload to server here.
    alert(`Resume "${file.name}" uploaded — review request submitted (demo).`);
    resumeInput.value = '';
  });

  // watch talks
  document.getElementById('watchTalks')?.addEventListener('click', () => {
    alert('Opening Talks playlist (demo).');
  });

  // Upload resource (demo)
  document.getElementById('uploadResource')?.addEventListener('click', () => {
    alert('Upload resource form (demo).');
  });

  // search box quick filter (basic client-side)
  const search = document.getElementById('globalSearch');
  search?.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    // very simple filter: hide cards that don't include query in their heading/body text
    document.querySelectorAll('.cards-grid .card').forEach(card => {
      const text = (card.textContent || '').toLowerCase();
      card.style.display = q === '' || text.includes(q) ? '' : 'none';
    });
  });
});
