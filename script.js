// 加载数据
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        displaySocialLinks(data.social);
        displayCryptoAddresses(data.addresses);
    });

// 显示社交链接
function displaySocialLinks(social) {
    const socialList = document.getElementById('social-list');
    socialList.innerHTML = social.map(item => `
        <div class="social-item">
            <a href="${item.url}" target="_blank">${item.name}</a>
        </div>
    `).join('');
}

// 显示收款地址
function displayCryptoAddresses(addresses) {
    const addressList = document.getElementById('address-list');
    addressList.innerHTML = addresses.map(item => {
        const networks = Object.keys(item.networks);
        const options = networks.map(network => `
            <option value="${network}">${network}</option>
        `).join('');
        const defaultNetwork = networks[0];
        return `
            <div class="address-item">
                ${item.coin}: <span id="address-${item.coin}">${item.networks[defaultNetwork]}</span>
                <select onchange="updateAddress('${item.coin}', this.value, ${JSON.stringify(item.networks)})">
                    ${options}
                </select>
            </div>
        `;
    }).join('');
}

// 更新地址
function updateAddress(coin, network, networks) {
    const addressSpan = document.getElementById(`address-${coin}`);
    addressSpan.textContent = networks[network];
}