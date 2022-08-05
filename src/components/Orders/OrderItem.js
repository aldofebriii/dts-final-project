const OrderItem = ({id, user, items}) => {
    return <>
    <div key={id} className="group relative">
        <div className="mt-4 flex justify-between">
            <div>
            <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0" />
                Order ID {id}
            </h3>
            {items.length > 0 && items.map((item, index) => {
                return <li key={index}>{item.name} - {item.amount} x</li>
            })}
            {items.length <= 0 && <p>No item Available</p>}
            <p>{user.name} - {user.city}</p>
            </div>
        </div>
    </div>
    </>
};

export default OrderItem;