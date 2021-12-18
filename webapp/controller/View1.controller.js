sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller, Filter, FlattenedDataset, FeedItem) {
		"use strict";

		return Controller.extend("homework3.controller.View1", {
			onInit: function () {

			},

			onPress: function(oEvent){
				let comboValue = this.getView().byId('idCombo').getValue();
				let oFilter = new Filter("Syear", "EQ", comboValue);
                let oTable = this.byId("idSalesTable");

                let oBinding = oTable.getBinding("items");
                oBinding.filter(oFilter);		
			},

			onSelectCarr: function(oEvent){
				let sCarrContext = oEvent.getSource().getBindingContext();
				let sCarrId = this.getView().getModel().getProperty('Carrid', sCarrContext);
				let sCarrName = this.getView().getModel().getProperty('Carrname', sCarrContext);;

				let oFilter = new Filter("Carrid", "EQ", sCarrId);

				let oViz1 = this.byId('idVizFrame');
                let oBinding = oViz1.getDataset('/ES_MONTHSet').getBinding('data');
                oBinding.filter(oFilter);


				oViz1.setVizProperties({
                    title : { text : sCarrName+" 년도별 매출액" },
					plotArea : {
                        colorPalette : d3.scale.category20().range(),
                        drawingEffect : "glossy",
							dataLabel: {
								visible: true
							}
                    }
                });

				let comboValue = this.byId("idCombo").getValue();
				let oViz2 = this.byId('idVizFrame2');
                let oBinding2 = oViz2.getDataset('/ES_MONTHSet').getBinding('data');
                let oFilter2 = [];
				oFilter2.push(new Filter("Syear", "EQ", comboValue));
				oFilter2.push(new Filter("Carrid", "EQ", sCarrId));

                oBinding2.filter(oFilter2);

				oViz2.setVizProperties({
                    title : { text : comboValue+" 년도별 매출액" },
					plotArea : {
                        colorPalette : d3.scale.category20().range(),
                        drawingEffect : "glossy"
                    }
                });
            },

            onSelect : function(oEvent){
                let year = oEvent.getParameter('data')[0].data.연도;
                let sCarrId = oEvent.getSource().getAggregation('dataset').getBindingInfo('data').binding.getFilterInfo().right.value;
                
                let oViz2 = this.byId('idVizFrame2');
                let oBinding2 = oViz2.getDataset('/ES_MONTHSet').getBinding('data');
                let oFilter2 = [];
				oFilter2.push(new Filter("Syear", "EQ", year));
				oFilter2.push(new Filter("Carrid", "EQ", sCarrId));

                oBinding2.filter(oFilter2);

                oViz2.setVizProperties({
                    title : { text : year+" 도별 매출액" },
					plotArea : {
                        colorPalette : d3.scale.category20().range(),
                        drawingEffect : "glossy"
                    }
                });
                


            }

		});
	});
