import { colors } from '@utils';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
  },
  difficulty: {
    color: colors.lightGreen,
    fontSize: 22,
    textAlign: 'center',
    marginTop: 20,
  },
  results: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  resultsBox: {
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: colors.lightPurple,
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 5,
  },
  resultsTitle: {
    color: colors.darkPurple,
    fontSize: 14,
  },
  resultsCount: {
    color: colors.darkPurple,
    fontSize: 12,
  },
  modal: {
    position: 'absolute',
    backgroundColor: colors.lightPurple,
    bottom: 40,
    left: 30,
    right: 30,
    padding: 30,
    borderWidth: 3,
    borderColor: colors.lightGreen,
  },
  modalText: {
    color: colors.lightGreen,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
