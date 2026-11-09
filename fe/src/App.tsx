import { useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SATRA_PRODUCTS } from './data/mockData';
import { CartDrawer } from './features/cart/CartDrawer';
import { CatalogScreen } from './features/catalog/CatalogScreen';
import { HomeScreen } from './features/home/HomeScreen';
import { LocationModal } from './features/location/LocationModal';
import { MembershipModal } from './features/membership/MembershipModal';
import { TraceabilityModal } from './features/traceability/TraceabilityModal';
import { CartItem, Product } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'category'>('home');
  const [targetSubCategory, setTargetSubCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('TP. Hồ Chí Minh');
  const [userPhone, setUserPhone] = useState('0908123456');

  // Pre-seed 3 items matching Screen 2's header badge ("3 món")
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: SATRA_PRODUCTS[0], quantity: 1 }, // Ba rọi heo
    { product: SATRA_PRODUCTS[1], quantity: 1 }, // Cải thìa thủy canh
    { product: SATRA_PRODUCTS[2], quantity: 1 }, // Cá hồi phi lê
  ]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMembershipOpen, setIsMembershipOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [traceabilityProduct, setTraceabilityProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const handleNavigate = (view: 'home' | 'category', subCategory?: string) => {
    setCurrentView(view);
    setTargetSubCategory(subCategory);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="bg-[#fdf8f8] text-[#111111] antialiased min-h-screen flex flex-col font-sans">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200 border border-[#DAFF01]/40">
          <span className="material-symbols-outlined text-[#DAFF01] text-[18px]">check_circle</span>
          <span className="font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white ml-2 bg-transparent border-0 cursor-pointer p-0"
            aria-label="Đóng thông báo"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Global Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
        selectedCity={selectedCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentView === 'home' ? (
          <HomeScreen
            onNavigateToCategory={(subCategory) => handleNavigate('category', subCategory)}
            onAddToCart={handleAddToCart}
            onShowTraceability={setTraceabilityProduct}
            onShowToast={showToast}
          />
        ) : (
          <CatalogScreen
            initialSubCategory={targetSubCategory}
            onNavigateHome={() => handleNavigate('home')}
            onAddToCart={handleAddToCart}
            onShowTraceability={setTraceabilityProduct}
            onShowToast={showToast}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onOpenStoreLocator={() => {
          if (currentView !== 'home') {
            handleNavigate('home');
            setTimeout(() => {
              document.getElementById('store-locator')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            document.getElementById('store-locator')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenPolicy={(title) => {
          showToast(`Chính sách: ${title}. Vui lòng liên hệ Hotline 1800 1199 để được hỗ trợ trực tiếp.`);
        }}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentView={currentView}
        onNavigate={handleNavigate}
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMembership={() => setIsMembershipOpen(true)}
        onOpenLocation={() => setIsLocationOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        deliveryCity={selectedCity}
      />

      {/* QR Traceability Modal */}
      <TraceabilityModal
        product={traceabilityProduct}
        onClose={() => setTraceabilityProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Satra Rewards Membership Modal */}
      <MembershipModal
        isOpen={isMembershipOpen}
        onClose={() => setIsMembershipOpen(false)}
        userPhone={userPhone}
        onSavePhone={setUserPhone}
        onShowToast={showToast}
      />

      {/* Delivery Location Modal */}
      <LocationModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={setSelectedCity}
      />
    </div>
  );
}
