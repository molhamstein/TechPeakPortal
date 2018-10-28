export class NavigationModel {
    public model: any[];

    constructor() {
        this.model = [
            {
                'id': 'home',
                'title': 'الرئيسية',
                'type': 'item',
                'icon': 'home',
                'url': '/home'
            },
            {
                'id': 'home',
                'title': 'الإعلانات',
                'type': 'item',
                'icon': 'send',
                'url': '/advertising'

            }, {
                'id': 'home',
                'title': 'النقرات',
                'type': 'item',
                'icon': 'forum',
                'url': '/clicked'

            }, {
                'id': 'home',
                'title': 'المشاهدات',
                'type': 'item',
                'icon': 'forum',
                'url': '/impressions'

            }, {
                'id': 'home',
                'title': 'الحملات الإعلانية',
                'type': 'item',
                'icon': 'forum',
                'url': '/campaign'

            },

            {
                'id': 'home',
                'title': 'الفوتير',
                'type': 'item',
                'icon': 'forum',
                'url': '/payment'

            },
            {
                'id': 'home',
                'title': 'الشركاء',
                'type': 'item',
                'icon': 'people',
                'url': '/partner'

            }, {
                'id': 'home',
                'title': 'المشتركين',
                'type': 'item',
                'icon': 'people',
                'url': '/client'

            },
            {
                'id': 'loc',
                'title': 'المواقع',
                'type': 'item',
                'icon': 'location_on',
                'url': '/locations'

            }/* ,{
                'id': 'home',
                'title': 'الصفحة الشخصية',
                'type': 'item',
                'icon': 'people',
                'url': '/apps/dashboards/project'

            },{
                'id': 'home',
                'title': 'الحسابات المالية',
                'type': 'item',
                'icon': 'local_offer',
                'url': '/apps/dashboards/project'

            },{
                'id': 'home',
                'title': 'الفوتير',
                'type': 'item',
                'icon': 'flag',
                'url': '/apps/dashboards/project'

            },{
                'id': 'home',
                'title': 'مواقعي',
                'type': 'item',
                'icon': 'flag',
                'url': '/apps/dashboards/project'

            } */

        ]
    }
}
