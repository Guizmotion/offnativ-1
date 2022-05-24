import { StyleSheet } from "react-native";
import colors from "../colors";


export default StyleSheet.create({

  hideElement: {
    display: "none"
  },

  
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    },
    modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    },
    buttonOpen: {
    backgroundColor: '#F194FF',
    },
    buttonClose: {
    backgroundColor: '#2196F3',
    },
    textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    },
    modalText: {
    marginBottom: 15,
    textAlign: 'center',
    },
    cardList: {
       flexDirection: 'row',
       width: '90%',
       margin: '5%',
       marginLeft: '5%',
       marginRight: '5%',
       borderRadius: 15,
       shadowOpacity: 0.1,
       shadowRadius: 5,
       height: 150,
   },
    blocContent: {
       width: '65%',
       alignSelf: "flex-end",

       flexDirection: "row",

       flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    blocImage: {
       width: '30%',
     // flex: 2, 
  
       position: 'absolute',
       marginTop: -15,
       marginBottom: 10,
    },
    labelInline: {
      alignContent: "flex-start",
      flexWrap: "wrap",
      flexDirection: "row",
    },
    labelCard: {
    backgroundColor: '#221f1f',
    color: '#fff',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 3,
    marginLeft: 0,
    marginRight: 6,
    alignSelf: "flex-start",
    fontSize: 10,
    borderRadius: 30,
    flexDirection: 'row'
    },
    labelAchat: {
      backgroundColor: '#f26522',
    },
    labelGris: {
      backgroundColor: '#e8e8e8',
      maxWidth: 'auto',
    },
    labelPlace: {
     backgroundColor: '#e8e8e8',
     maxWidth: '40%',
   },
   TextPhone: {
    fontSize: 16, 
    fontWeight: "bold",
   },
    Paragraph:{
      position: "relative",
      maxWidth: '100%',
    },
    Titre: {
     fontSize: 16,
     width: "80%",
     fontWeight: "bold",
     padding: '1%',
     alignSelf: "flex-start",

    },
    ParagraphBold: {
     fontWeight: "bold",
    },
    defautText: {
     fontSize: 10,
    },
    smallTextNoir: {
     color: '#221f1f',
     fontSize: 8,
    },
    TextFicheClair: {
      color: '#e8e8e8',
    },
   
    smallText: {
       color: '#fff',
       fontSize: 8,
    },
    headView: {
     width: '100%',
     flexDirection: "row",
     alignItems: 'flex-end',
     right: 0,
     borderBottomWidth: 0
   },
    titrePage: {
     fontSize: 20,
     fontWeight: "bold",
       width: '100%',
       textAlign: 'right'
    },
    
    favorisBtn: {
     width: 30,
     height: 30,
     position: 'absolute',
     marginBottom: 10,
     bottom: 0,
     right: 10,
     backgroundColor: '#fff',
     borderRadius: 30,
     padding: 10,
     zIndex: 5000,
     flex: 2
    },
    openMenu: {
     position: "absolute",
     top: 5,
     left: 10,
     width: 45,
     height: 40,
     padding: 10,
    },
    imageFiche: {
      width: '100%',
      height: 300,
      top: 0,
      flex: 1,
     },
     closeFiche: {
       position: 'absolute',
       top: 40,
       right: 30,
       width: 40,
       height: 40,
       padding: 8,
       backgroundColor: "#fff",
       borderRadius: 30,
       zIndex:999,
       shadowOpacity: 0.3,
       shadowColor: "black",
       shadowRadius: 5,
     },

     labelBigplace: {
       height: 35,
       backgroundColor: '#e8e8e8',
       margin: 0,
       marginLeft: 10,
       flex: 2,
       color: '#fff',
       fontSize: 10,
       padding: 9,
       borderRadius: 30,
       alignItems: 'flex-end', 
       overflow: "hidden",
       maxWidth: '70%',
     },
     btnFixed: {
       fontSize: 36,
       fontWeight: 'bold',
       width: '80%',
       position: 'absolute',
       bottom: 30,
       marginLeft: '10%',
       height: 45,
       padding: 9,
       textAlign: "center",
     },
     bigButton: {
       padding: 10,
     },

     textBigButton: {
     textAlign: 'center', 
     width: '100%',
     fontSize:20, 
     fontWeight: 'bold',
     color: '#fff',
     },
    
     blocGris: {
       flexDirection: 'row', 
       backgroundColor: '#e8e8e8',
        padding: 15, 
        borderRadius: 15,
        margin: '5%', 
        marginRight: 0, 
        marginLeft: 0,
     },
     flexColumn: {
      flexDirection: 'column',
      width: '100%',
    },
     alignCenter: {
       textAlign: "center",
       alignSelf: 'center',
     },
     borderDot: {
       borderStyle: 'dotted', borderRightWidth: 2, borderRightColor: '#221f1f', 
     },
     btnBig: {
       backgroundColor: '#221f1f',
       color: '#fff',
       padding: 10,
       margin: 3,
       alignSelf: "flex-start",
       borderRadius: 30,
       flexDirection: 'row',
       height: 45,
       minWidth: 45,
     },
     Separateur: {
      width: '90%',
      backgroundColor: '#e8e8e8',
      height: 1,
      margin: '5%',
      marginBottom: 10,
      marginTop: 10,
     },
     SeparateurSmall: {
      width: '30%',
      backgroundColor: 'rgba(0,0,0,0.1)',
      height: 1,
      margin: '5%',
      marginBottom: 10,
      marginTop: 10,
     },
     SeparateurVertical: {
      width: 1,
      backgroundColor: 'rgba(0,0,0,0.2)',
      height: 70,
     },
     titreFiche: {
      fontSize: 24,
      fontWeight: 'bold',
      width: '100%',
      color: '#221f1f',
    },
    TextSousTitre: {
      fontSize: 18,
      fontWeight: 'bold',
      width: '100%',
      color: '#221f1f',
      marginTop: 10,
      marginBottom:10,
    },
    justifyElement: {
      width: '100%',
      textAlign: "center",
      alignContent: "center",
      
    flexDirection: "row",
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    },

    sectionHeader: {
      padding: 10,
      fontSize: 36,
      fontWeight: 'bold',
      backgroundColor: '#e8e8e8'
    },
    item: {
      padding: 10,
      fontSize: 16,
      height: 44,
    },
    selectItem: {
      backgroundColor: '#d86f5f',
    }, 
    itemInit: {
      
      fontWeight: 'bold',
      fontSize: 12,
      height: 25,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    rechInitGlobal: {
      padding: 10, 
      width: '12%',
      backgroundColor: "#fff", 
      position: 'absolute', 
      right: 0, 
      height: '78%', 
      top: '11%',
      borderBottomLeftRadius: 30,
      borderTopLeftRadius: 30,
      zIndex:999,
      shadowOpacity: 0.1,
      shadowColor: "black",
      shadowRadius: 5,
      paddingTop: 20,
      flexDirection: "column",
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'nowrap',
    },

    sideMenuProfileIcon: {
      // resizeMode: 'center',
       width: 100,
       height: 100,
       alignSelf: 'flex-start',
       left: 20,
     },
     customItem: {
       padding: 16,
       flexDirection: 'row',
       alignItems: 'center',
     },
     closeMenu: {
       position: "absolute",
       top: 30,
       right: 20,
       width: 45,
       height: 40,
       padding: 10,
      },
      iconStyle: {
        width: 35,
        height: 35,
        borderRadius: 35,
        overflow: 'hidden',
        margin: 5,
        marginTop: 0,
        marginBottom: 0,
      },

      loader: {
        backgroundColor: 'white',
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      inputStyle: {
        width: '100%',
        height: 45,
        borderRadius: 35,
        backgroundColor: '#e9e8e8',
        paddingRight:  20,
        paddingLeft: 20,
        marginTop: 10,
        marginBottom: 10,
      },
      colorOrange: {
        color: '#f26522',
      },
      colorBlack: {
        color: '#231f20',
      },
      headerLeft: {
        paddingLeft: 15,
      },


    });