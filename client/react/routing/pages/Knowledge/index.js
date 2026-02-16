import { NavLink, Outlet, useRouteLoaderData } from 'react-router'
import { Icon } from '../../../ui/Icon'



export default function()
{
	const data = useRouteLoaderData('Knowledge')

	return (
		<section className="flex-1-r">
			<div className="layout-list">
				<header className="list-header layout-toprow c-flex-r">
					<div className="list-header-left c-flex-r">
						<h1>Knowledge</h1>

						<NavLink
							className=""
							to="/knowledge/new"
						>
							<div className="button--new">
								<Icon fragment="plus" />
							</div>
							</NavLink>
					</div>


				</header>

				<div className="list-controls"></div>

				<div className="list">

					<ul>
						{ data && data.map((item) => (
							<li
								key={ item.item_id }
								className="list__item"
							>
								<NavLink
									className="list__item__title"
									to={ `/knowledge/${item.item_id}` }
								>
									{ item.title || 'Untitled' }
								</NavLink>
							</li>
						)) }
					</ul>
				</div>
			</div>

			<Outlet/>
		</section>
	)
}

