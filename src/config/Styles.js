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
  },
  secondarySmallButton: {
    padding: 10,
    paddingVertical: 5,
    backgroundColor: AppColors.secondaryAccentColor,
    borderRadius: 10,
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
};

export default Values;
