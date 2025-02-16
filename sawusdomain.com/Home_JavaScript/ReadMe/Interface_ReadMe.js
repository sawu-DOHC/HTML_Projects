function Interface_ReadMe() {
    const windowBody = document.getElementById("Window-Body-2");

    // Create the text area and set its properties
    const textArea = document.createElement("textarea");
    textArea.id = "Window-Body-2";  
    textArea.className = "window-body"; 

    // Replace windowBody with textArea
    windowBody.replaceWith(textArea);

    // Create the directory structure as a string
    const directoryStructure = `
Root/Desktop Directory
│
├── Application - My Computer                
│
├── Application - Read Me                   
│
├── C Projects
│   ├── Link - School registration program   
│   │
│   ├── Link - Replicating the vector class  
│   │
│   ├── Link - Search Algorithms           
│   │
│   └── Link - Sort Algorithms             
│
│
├── Java Projects
│   └── Link - Lottery Game Data Management 
│   
│
├── Directory - HTML Projects
│   ├── Link - Fulton County Payroll Deduction Form 
│   │ 
│   ├── Link - Wild Rescues                
│   │ 
│   ├── Link - Strike A Chord             
│   │ 
│   ├── Link - Sam's Welds                
│   │ 
│   ├── Link - Online order form          
│   │ 
│   ├── Link - Timed math quiz            
│   │ 
│   ├── Link - Hiring Partner Database Documentation 
│   │ 
│   └── Link - Input validation          
│
│
├── Directory - Python Projects
│   ├── Link - Duplicate image remover    
│   │ 
│   ├── Link - Hiring Partner Database Documentation 
│   │ 
│   ├── Link - Hiring Partner Database Documentation 
│   │ 
│   └── Nested directory a 
│       │
│       └── Nested directory b
│            │
│            └── Nested directory c
│                 
│
├── Application - NASA's API   
│                         
├── Link - Fulton County Payroll Deduction Form 
│
├── Application - Temperature Converter     
│
├── Application - Coingecko API             
│
├── Application - Time Converter            
│
├── Application - Timer-Stopwatch           
│
└── Link - E-Mail`;

    textArea.value = directoryStructure;
}

Interface_ReadMe();
