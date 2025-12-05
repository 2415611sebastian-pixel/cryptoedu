function simulatePriceChange(priceText) {
    const cleanPriceStr = priceText.replace('Rp', '').replace(/\./g, '').replace(',', '.').trim();
    
    let currentPrice = parseFloat(cleanPriceStr);
    
    let maxChange = 0.05; 

    if (currentPrice < 100) {
        maxChange = 0.15; 
    }

    const changePercentage = (Math.random() * (2 * maxChange)) - maxChange; 

    const newPrice = currentPrice * (1 + changePercentage);

    let formattedPrice;
    
    if (newPrice < 1) {
        formattedPrice = newPrice.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 4 
        });
    } else if (newPrice < 1000) {
        formattedPrice = newPrice.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
    } else {
        formattedPrice = Math.round(newPrice).toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        });
    }


    const percentageString = (changePercentage * 100).toFixed(2) + '%';
    
    const changeClass = changePercentage >= 0 ? 'positive' : 'negative';

    return {
        newPrice: formattedPrice,
        changePercentage: percentageString,
        changeClass: changeClass
    };
}

function refreshCryptoData() {
    const tableRows = document.querySelectorAll('#cryptoDataBody tr');
    
    tableRows.forEach(row => {
        const priceCell = row.querySelector('[data-price]');
        const changeCell = row.querySelector('.change');

        if (priceCell && changeCell) {
            const originalPrice = priceCell.textContent;
            
            const result = simulatePriceChange(originalPrice);

            priceCell.textContent = result.newPrice;

            changeCell.textContent = (result.changeClass === 'positive' ? '+' : '') + result.changePercentage;
            
        
            changeCell.classList.remove('positive', 'negative');
            changeCell.classList.add(result.changeClass);
        }
    });

    console.log("Data Crypto untuk 10 koin telah diperbarui!");
}

document.getElementById('refreshDataBtn').addEventListener('click', refreshCryptoData);
