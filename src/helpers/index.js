export const formatQuantity = quantity => {
    return quantity.toLocaleString('en-US',{
        style: 'currency',
        currency: 'USD'
    })
}