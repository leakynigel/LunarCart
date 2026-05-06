import { useState } from 'react'
import { ShoppingCart, Search, Info } from 'lucide-react'
import OrangeButton from '../shared/OrangeButton'
import Input from '../shared/Input'

const mockProducts = Array.from({ length: 10 }, (_, index) => ({
  id: `P-${1000 + index}`,
  title: `Lunar Item ${index + 1}`,
  price: `Ksh ${(24 + index * 6).toFixed(2)}`,
  image: `https://via.placeholder.com/360x220?text=Lunar+Item+${index + 1}`,
}))

function ProductCard({ product, onAddToCart }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <img className="h-44 w-full rounded-3xl object-cover" src={product.image} alt={product.title} />
      <div className="mt-4 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-brand-charcoal">{product.title}</h3>
          <p className="text-sm text-slate-500">Marketplace favorite</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-brand-orange">{product.price}</p>
          <OrangeButton onClick={() => onAddToCart(product)}>Add to Cart</OrangeButton>
        </div>
      </div>
    </article>
  )
}

export default function BuyerLanding() {
  const [cartCount, setCartCount] = useState(0)
  const [showEscrow, setShowEscrow] = useState(false)

  const handleAddToCart = (product) => {
    setCartCount((count) => count + 1)
    console.log(`Triggered Add to Cart for ${product.title}`)
  }

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-orange">Role: Buyer</p>
            <h1 className="text-3xl font-semibold text-brand-charcoal">Marketplace</h1>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            onClick={() => console.log('Triggered View Cart')}
          >
            <ShoppingCart className="h-4 w-4" />
            Cart ({cartCount})
          </button>
        </div>
      </header>

      <div className="sticky top-6 z-20 rounded-[2rem] border border-slate-200 bg-white/95 px-6 py-4 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Search className="h-4 w-4 text-slate-400" />
          <Input className="m-0 bg-transparent p-0 text-sm" placeholder="Search for products..." />
        </div>
      </div>

      <section className="space-y-5">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Featured</p>
          <h2 className="text-2xl font-semibold text-brand-charcoal">Browse Products</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </section>

      <div className="flex flex-col items-center gap-8 pt-16 pb-12 border-t border-slate-200">
        <button
          type="button"
          onClick={() => setShowEscrow(!showEscrow)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 active:scale-95"
        >
          <Info className="h-4 w-4 text-brand-orange" />
          {showEscrow ? 'Hide Protection Details' : 'Secure Escrow Information'}
        </button>

        {showEscrow && (
          <section className="w-full max-w-5xl rounded-[2.5rem] border border-slate-200 bg-brand-orange/5 px-8 py-12 shadow-sm transition-all">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-brand-orange font-bold">Safe Marketplace</p>
                <h2 className="mt-2 text-3xl font-semibold text-brand-charcoal">Secure Escrow-Backed Marketplace</h2>
                <p className="mt-6 text-base leading-7 text-slate-600">
                  All LunarCart transactions are protected by our high-precision escrow system. Funds are held securely and only released when the buyer confirms satisfaction, ensuring total trust for both parties.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <OrangeButton onClick={() => console.log('Triggered Start Shopping')}>Start Shopping</OrangeButton>
                  <button 
                    type="button" 
                    className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
                    onClick={() => console.log('Triggered FAQ')}
                  >
                    Read FAQ
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
        
        <footer className="text-[10px] text-slate-400 uppercase tracking-[0.3em] font-medium">
          &copy; {new Date().getFullYear()} LunarCart &bull; Secure Protocol 19.2
        </footer>
      </div>
    </div>
  )
}
