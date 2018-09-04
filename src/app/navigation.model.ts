export class NavigationModel
{
    public model: any[];

    constructor()
    {
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

            },{
                'id': 'home',
                'title': 'النقرات',
                'type': 'item',
                'icon': 'forum',
                'url': '/clicked'

            },{
                'id': 'home',
                'title': 'الحملات الإعلانية',
                'type': 'item',
                'icon': 'forum',
                'url': '/campaign'

            },
            {
                'id': 'home',
                'title': 'المستخدمين',
                'type': 'item',
                'icon': 'people',
                'url': '/partner'

            },{
                'id': 'home',
                'title': '2المستخدمين',
                'type': 'item',
                'icon': 'people',
                'url': '/client'

            },{
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

            }
            
        ]
    }
}
