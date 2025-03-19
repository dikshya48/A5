async function updateHitCount(pageID) {
    try {
      const response = await fetch(`/hits/${pageID}`);
      const data = await response.json();
      document.getElementById('hit-count').textContent = data.hits;
    } catch (error) {
      console.error('Error fetching hit count:', error);
      document.getElementById('hit-count').textContent = 'Error';
    }
  }