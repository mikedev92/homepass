// @flow
import { StackNavigator, TabNavigator } from 'react-navigation';
import { variables } from '../theme';
import Home from './Home';
import Profile from './Profile';
import Welcome from './Auth/Welcome';
import EmailSignIn from './Auth/EmailSignIn';
import EmailEnterCode from './Auth/EmailEnterCode';
import StyleGuide from './StyleGuide';
import Space from './Space';
import SpaceEvents from './SpaceEvents';
import SpaceContacts from './SpaceContacts';
import SpaceMemberships from './SpaceMemberships';
import SpaceMembershipRequests from './SpaceMembershipRequests';
import SpaceVisibility from './SpaceVisibility';
import SpaceAddMember from './SpaceAddMember';
import SpaceList from './SpaceList';
import SpaceFilters from './SpaceFilters';
import People from './People';
import ContactDetails from './ContactDetails';

const AppNavigator = TabNavigator({
	Home: { screen: Home },
	Places: { screen: Home },
	Chat: { screen: Home },
	People: { screen: People },
	Settings: { screen: Home }
});
export default StackNavigator(
	{
		Welcome: { screen: Welcome },
		EmailSignIn: { screen: EmailSignIn },
		EmailEnterCode: { screen: EmailEnterCode },
		App: { screen: AppNavigator },
		Space: { screen: Space },
		Profile: { screen: Profile },
		SpaceEvents: { screen: SpaceEvents },
		SpaceContacts: { screen: SpaceContacts },
		SpaceMemberships: { screen: SpaceMemberships },
		SpaceMembershipRequests: { screen: SpaceMembershipRequests },
		SpaceVisibility: { screen: SpaceVisibility },
		SpaceAddMember: { screen: SpaceAddMember },
		SpaceList: { screen: SpaceList },
		SpaceFilters: { screen: SpaceFilters },
		StyleGuide: { screen: StyleGuide },
		ContactDetails: { screen: ContactDetails }
	},
	{
		cardStyle: {
			backgroundColor: 'transparent',
			shadowOffset: null,
			shadowOpacity: null,
			shadowRadius: null
		},
		navigationOptions: {
			header: null,
			headerStyle: {
				backgroundColor: 'white'
			},
			headerTintColor: variables.brandPrimary,
			headerTitleStyle: {
				color: 'black'
			}
		}
	}
);
