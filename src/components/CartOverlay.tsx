import useCart from "@/hooks/useCart";
import { formatCurrency } from "@/utils/formatCurrency";
import { Button } from "./ui/button";

function CartOverlay({
  showCart,
  setShowCart,
}: {
  showCart: boolean;
  setShowCart: (val: boolean) => void;
}) {
  const { cart, updateQty, removeFromCart } = useCart();
  return (
    <>
      {showCart && (
        <div className="w-full h-screen flex items-start justify-end">
          <div
            onClick={() => setShowCart(false)}
            className="w-full h-screen fixed top-0 left-0 z-50 bg-black bg-opacity-65"
          ></div>
          <div className="w-[320px] bg-white h-screen absolute right-0 top-0 z-50 py-10 px-3">
            <div className="flex item-center justify-between">
              <div>
                <h5 className="text-lg font-semibold">Shopping Cart</h5>
                <p className="text-sm text-gray-600">
                  You have {cart.length} in your cart.
                </p>
              </div>
              <Button
                onClick={() => setShowCart(false)}
                className="w-12 h-6 text-xs"
              >
                Close
              </Button>
            </div>

            <ul className="flex flex-col py-2 gap-5">
              {cart.map((item, id) => (
                <div key={id}>
                  <li className="flex items-start justify-between gap-2">
                    <span className="flex justify-between flex-shrink-0 w-10 h-10 rounded-md bg-gray-100"></span>
                    <div>
                      <h5 className="text-sm font-medium">{item.name}</h5>
                      <p className="text-xs text-gray-700">
                        {formatCurrency(item.price ?? 0)} each
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        className="min-w-6 h-6 border border-gray-200"
                        onClick={() => updateQty(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        className="min-w-6 h-6 border border-gray-200"
                        onClick={() => updateQty(item.id, 1)}
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-3"
                      >
                        x
                      </button>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
            <hr />
            <div className="flex items-center justify-between h-14">
              <h5 className="font-medium">Total:</h5>
              <h4 className="text-lg font-semibold">
                {formatCurrency(
                  cart.reduce(
                    (acc, current) => acc + current.price * current.qty,
                    0
                  )
                )}
              </h4>
            </div>
            <Button className="w-full">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </>
  );
}

export default CartOverlay;
