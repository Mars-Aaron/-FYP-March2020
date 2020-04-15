import AppColors from './Colors';

const Values = {
  glBorderRadius: 10,
  rootViewStyle: {
    flex: 1,
    backgroundColor: AppColors.primaryColor,
  },
  primarySmallButton: {
    padding: 20,
    paddingVertical: 10,
    backgroundColor: AppColors.accentColor,
    borderRadius: 10,
    marginLeft: 10,
    elevation: 10,
  },
  secondarySmallButton: {
    padding: 20,
    paddingVertical: 10,
    backgroundColor: AppColors.secondaryAccentColor,
    borderRadius: 10,
    marginLeft: 10,
  },
  borderlessSmallButton: {
    padding: 20,
  },
  primaryButtonText: {
    fontWeight: 'bold',
    color: AppColors.textColor,
    textAlign: 'center',
  },
  secondaryButtonText: {
    fontWeight: 'bold',
    color: AppColors.secondaryTextColor,
    textAlign: 'center',
  },
  drawerStyle: {
    width: '80%',
  },
};

export default Values;
