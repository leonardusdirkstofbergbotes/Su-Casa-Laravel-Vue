export default {
    name: "Admin",

    setup() {
        const menuItems = [{
            link: '/admin/categories',
            name: 'Categories',
            icon: 'food'
        },{
            link: '/admin/meals',
            name: 'Meals',
            icon: 'noodles'
        },{
            link: '/browse',
            name: 'Browse',
            icon: 'hamburger'
        }];

        return {
            menuItems
        }
     }
}
