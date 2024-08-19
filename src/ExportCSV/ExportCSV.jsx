// ExportCSV.js
const exportCSV = (data) => {
    const today = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
    const header = ['Date', 'Title', 'Amount', 'Category', 'Description']; // CSV header
    const rows = data.map(item => [
        today, // Add the export date to each row
        item.title,
        item.amount,
        item.category,
        item.description
    ]);

    // Create CSV content
    const csvContent = [
        header.join(','), 
        ...rows.map(e => e.join(','))
    ].join('\n');

    // Create a blob and use FileSaver.js to save the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `expenses-${today}.csv`); // Filename includes date
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default exportCSV;
