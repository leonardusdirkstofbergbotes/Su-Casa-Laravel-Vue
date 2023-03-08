export default {
    name: "Admin",

    setup() {
        const menuItems = [{
            link: '/admin/categories',
            name: 'Categories',
            icon: 'food'
        },{
            link: '/admin/food',
            name: 'Food',
            icon: 'hamburger'
        },{
            link: '/admin/meals',
            name: 'Meals',
            icon: 'noodles'
        }];

        return {
            menuItems
        }
     }
}
