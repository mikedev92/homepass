// @flow
import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';
import Home from '../Home';

const testProps = [
	{
		data: {
			viewer: {
				id: '234',
				imageUrl: 'somePictureUrl',
				firstName: 'First Name',
				spaces: {
					edges: []
				}
			}
		}
	},
	{
		data: {
			viewer: {
				spaces: {
					edges: [
						{
							node: {
								id: '123',
								title: 'Property',
								nextEvent: {
									name: 'Woo',
									startDate: new Date(0),
									endDate: new Date(1000000000000000000)
								}
							}
						}
					]
				}
			}
		}
	},
	{
		data: {
			viewer: {
				id: '234',
				imageUrl: 'somePictureUrl',
				firstName: 'First Name',
				spaces: {
					edges: [
						{
							node: {
								id: '123',
								title: 'Property 1',
								nextEvent: {
									name: 'Woo',
									startDate: new Date(0),
									endDate: new Date(1000000000000000000)
								}
							}
						},
						{
							node: {
								id: '1234',
								title: 'Property 2',
								nextEvent: {
									name: 'Woo',
									startDate: new Date(0),
									endDate: new Date(1000000000000000000)
								}
							}
						}
					]
				}
			}
		}
	}
];

describe('<Home />', () => {
	beforeEach(() => {
		MockDate.set(new Date('1/1/2000'));
	});

	afterEach(() => {
		MockDate.reset();
	});

	it('matches snapshots', () => {
		testProps.forEach(props => {
			const wrapper = shallow(<Home {...props} />);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
