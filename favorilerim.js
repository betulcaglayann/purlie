document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.querySelector('.favorites-container');

    function loadFavorites() {
        // Tüm favori ürünleri localStorage'dan al
        const favorites = Object.keys(localStorage)
            .filter(key => key.endsWith('_favorite'))
            .map(key => key.replace('_favorite', ''));

        // Konteyner boşsa bilgilendirme mesajı göster
        if (favorites.length === 0) {
            favoritesContainer.innerHTML = `
                <div class="empty-favorites">
                    Henüz favori ürününüz bulunmuyor.
                </div>
            `;
            return;
        }

        // Favori ürünleri listele
        favorites.forEach(productName => {
            const productCard = createFavoriteCard(productName);
            if (productCard) {
                favoritesContainer.appendChild(productCard);
            }
        });
    }

    function createFavoriteCard(productName) {
        // Orijinal kartı bul
        const originalCard = Array.from(document.querySelectorAll('.category-card'))
            .find(card => card.querySelector('h3').textContent === productName);

        if (!originalCard) return null;

        // Kartın bir kopyasını oluştur
        const favoriteCard = originalCard.cloneNode(true);
        
        // Kaldırma butonu ekle
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Favorilerden Çıkar';
        removeButton.classList.add('remove-favorite-btn');
        removeButton.addEventListener('click', () => {
            localStorage.removeItem(productName + '_favorite');
            favoriteCard.remove();
            
            // Eğer hiç favori kalmadıysa bilgilendirme mesajı göster
            if (favoritesContainer.children.length === 0) {
                favoritesContainer.innerHTML = `
                    <div class="empty-favorites">
                        Henüz favori ürününüz bulunmuyor.
                    </div>
                `;
            }
        });

        favoriteCard.querySelector('.category-content').appendChild(removeButton);
        return favoriteCard;
    }

    loadFavorites();
});