export default {
    name: "Default",

    setup() {
        const menuItems = [{
            link: '/browse',
            name: 'Home',
            icon: 'home'
        },{
            link: '/food',
            name: 'Food',
            icon: 'food'
        },{
            link: '/cart',
            name: 'Cart',
            icon: 'cart'
        }];

        return {
            menuItems
        }
     }
}
