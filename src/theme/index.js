// @flow
import { variables as nbVariables, getTheme } from 'native-base';
import { merge } from 'lodash';

const variableDefaults = {
	...nbVariables,

	// colors
	get primary() {
		return '#03A9F4';
	},
	get dark() {
		return '#000';
	},
	get darkGray() {
		return '#8C8C8C';
	},
	get gray() {
		return '#CDCED2';
	},
	get lightGray() {
		return '#EFEFF3';
	},
	get light() {
		return '#FFFFFF';
	},

	get alert() {
		return '#FE2851';
	},

	get backgroundDark() {
		return '#FAFAFA';
	},

	// brands
	get facebookPrimary() {
		return '#3B5998';
	},

	// nativebase overrides
	borderColor: '#CDCED2',
	listDividerBg: 'transparent',
	get inputColorPlaceholder() {
		return this.lightGray;
	},
	get brandPrimary() {
		return this.primary;
	},
	get btnPrimaryBg() {
		return this.primary;
	},
	get topTabBarActiveTextColor() {
		return this.primary;
	},
	get topTabBarActiveBorderColor() {
		return this.primary;
	},
	get toolbarDefaultBg() {
		return this.light;
	},
	get tabDefaultBg() {
		return this.light;
	},
	get topTabBarTextColor() {
		return this.gray;
	}
};

const getHomepassTheme = variables => ({
	'NativeBase.ViewNB': {
		'.backgroundPrimary': {
			backgroundColor: variables.primary
		},
		'.backgroundDark': {
			backgroundColor: variables.dark
		},
		'.backgroundDarkGray': {
			backgroundColor: variables.darkGray
		},
		'.backgroundGray': {
			backgroundColor: variables.gray
		},
		'.backgroundLightGray': {
			backgroundColor: variables.lightGray
		},
		'.backgroundLight': {
			backgroundColor: variables.light
		},
		'.backgroundAlert': {
			backgroundColor: variables.alert
		},
		'.bordered': {
			borderWidth: variables.borderWidth,
			borderColor: variables.gray
		}
	},
	'NativeBase.TabHeading': {
		'NativeBase.Text': {
			fontSize: 14,
			fontWeight: '400'
		},
		'.active': {
			'NativeBase.Text': {
				fontWeight: '400'
			}
		}
	},
	'NativeBase.Separator': {
		backgroundColor: variables.backgroundDark
	},
	'NativeBase.List': {
		backgroundColor: variables.light,
		borderBottomWidth: variables.borderWidth,
		borderColor: variables.borderColor,
		overflow: 'hidden'
	},
	'NativeBase.ListItem': {
		paddingTop: 4,
		paddingBottom: 4,
		minHeight: 44,
		'NativeBase.Body': {
			minHeight: 44
		}
	},
	'NativeBase.Button': {
		'.facebookPrimary': {
			backgroundColor: variables.facebookPrimary
		},
		'.noPadding': {
			paddingTop: 0,
			paddingBottom: 0,
			paddingLeft: 0,
			paddingRight: 0,
			height: undefined
		}
	},
	'NativeBase.Icon': {
		'.primary': {
			color: variables.primary
		},
		'.white': {
			color: '#fff'
		},
		'.note': {
			color: '#a7a7a7'
		},
		'.header': {
			color: variables.primary,
			marginHorizontal: 16,
			fontSize: 40
		},
		'.facebookPrimary': {
			color: variables.facebookPrimary
		}
	},
	'NativeBase.Header': {
		paddingTop: 20,
		borderBottomWidth: 0,
		'.bordered': {
			borderBottomWidth: variables.borderWidth
		}
	},
	'NativeBase.Container': {
		backgroundColor: 'white',
		'.backgroundDark': {
			backgroundColor: variables.backgroundDark
		}
	},
	'NativeBase.Content': {
		'.statusBarPadding': {
			marginTop: 25,
			flex: 1
		},
		'.listPadding': {
			padding: variables.listItemPadding + 5
		}
	},
	'NativeBase.H1': {
		fontSize: 26,
		fontWeight: '700'
	},
	'NativeBase.H2': {
		fontSize: 26,
		fontWeight: '400'
	},
	'NativeBase.Text': {
		fontSize: 17,
		fontWeight: '400',
		'.left': {
			textAlign: 'left'
		},
		'.display': {
			fontSize: 40,
			fontWeight: '900'
		},
		'.accent': {
			fontSize: 20,
			fontWeight: '400'
		},
		'.title': {
			fontSize: 17,
			fontWeight: '700'
		},
		'.body': {
			fontSize: 17,
			fontWeight: '400'
		},
		'.bodySmall': {
			fontSize: 15,
			fontWeight: '400'
		},
		'.caption': {
			fontSize: 13,
			fontWeight: '400',
			color: variables.darkGray
		},
		'.status': {
			fontSize: 13,
			fontWeight: '500',
			color: variables.darkGray
		},
		'.note': {
			fontSize: 13,
			fontWeight: '500',
			color: variables.darkGray
		},
		'.center': {
			textAlign: 'center'
		},
		'.primary': {
			color: variables.primary
		},
		'.darkGray': {
			color: variables.darkGray
		},
		'.alert': {
			color: variables.alert
		},
		'.light': {
			color: variables.light
		}
	},
	'NativeBase.Fab': {
		'.primary': {
			backgroundColor: variables.primary
		}
	},
	'NativeBase.Card': {
		'.transparent': {
			borderColor: 'transparent'
		}
	},
	'Homepass.Feed': {
		'NativeBase.ListItem': {
			borderBottomWidth: 0,
			marginHorizontal: 0,
			backgroundColor: 'transparent',
			padding: 0,
			marginBottom: variables.contentPadding,
			'NativeBase.Left': {
				flex: 0,
				alignSelf: 'flex-start',
				backgroundColor: 'white',
				padding: 1,
				'NativeBase.Icon': {
					fontSize: 19,
					textAlign: 'center',
					width: 19,
					height: 19,
					borderRadius: 9.5,
					overflow: 'hidden',
					color: 'white',
					backgroundColor: 'black'
				}
			},
			'NativeBase.Right': {
				alignSelf: 'flex-start'
			}
		}
	},
	'NativeBase.Input': {
		'.large': {
			fontSize: 20
		}
	},
	'NativeBase.Item': {
		'.rounded': {
			borderRadius: 4
		},
		'.backgroundDark': {
			backgroundColor: variables.backgroundDark
		},
		'.noBorder': {
			borderWidth: 0
		}
	},
	'NativeBase.Thumbnail': {
		width: 36,
		height: 36,
		borderRadius: 18,
		'.xSmall': {
			width: 30,
			height: 30,
			borderRadius: 15
		},
		'.large': {
			width: 50,
			height: 50,
			borderRadius: 25
		},
		'.xLarge': {
			width: 70,
			height: 70,
			borderRadius: 35
		}
	}
});
export { variableDefaults as variables };

export default variableOverrides => merge(getTheme({ ...variableDefaults, ...variableOverrides }), getHomepassTheme({ ...variableDefaults, ...variableOverrides }));
