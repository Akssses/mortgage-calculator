export const percentFormatter = new Intl.NumberFormat('ru-RU', 
    {
        style: 'percent',
        maximumFractionDigits: 3
    }
)

export const priceFormatter = new Intl.NumberFormat('ru-RU', 
    {
        style: 'currency',
        maximumFractionDigits: 0,
        currency: "RUB"
    }
)
