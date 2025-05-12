function insertData(data, sections) {
    const id = data.getId();
  
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
  
      if (section.string_id !== data.process) continue;
  
      for (let j = 0; j < section.array_articles.length; j++) {
        const article = section.array_articles[j];
  
        if (article.string_material !== data.material) continue;
  
        const table = article.table;

        table.cellMap[id].addData(data);
        return;
        
      }
    }
  
    console.warn("No matching table cell found for " + id);
  }
  