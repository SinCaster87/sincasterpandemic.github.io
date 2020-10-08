/*

story["choices"]["close"]["text"]
story["choices"]["open"]["text"]

*/




const story = {text: "You learn of a pandemic growing out into other countries",
				choices:{
					close:{
						text: "close borders to prevent infected \n from coming  into country",
						choices:{
							safe:{
								text: "Virus infects nobody for a while and citizens request open borders",
								choices:{
									openborders:{
										text: "Open borders",
										choices:{
											infectionrise:{
												text:"People start to get infected by returning travelers and concerns start to rise",
												choices:{
													harshcontrol:{
														text:"Figure out where the virus is and demand martial law in infected area \n and back contact track everyone confirmed infected. Harsh control over it.",
														choices:{
															noinfect:{
																text:"No new infections across country occur and virus is contained \n until those who have it die or fight it off. Very minor damage done to country.",
																choices:{

																}
															}

														}
													},
													nocontrol:{
														text: "Find out where virus is and contract trace everyone infected but do not put \n harsh restrictions on the area. People are allowed to move around freely.",
														choices:{
															outcontrol:{
																text: "New infections occur across country and spiral situation out of control",
																choices:{
																	nocontrol:{
																		text: "Allow people to still move around freely",
																			choices:{
																				heavydeath:{
																					text: "Disease kills millions but eventually passes through country. \n With loss of millions, lots of jobs have been left unfilled and country will \n take years to repair collateral damage in letting the virus rage.",
																							}

																						}
																					},
																					martiallaw:{
																						text: "Order martial law and lock down everything and everyone",
																						choices:{
																							noinfect:{
																								text: "No new infections across country occur and virus is contained \n until those who have it die or fight it off. \nState of country is damaged but not too signifigantly.",
																							}

																						}
																					}

																				}
																			}

																		}
																	}
																}
															}

														}
													},
									keepclosed:{
										text: "Keep them closed until pandemic has been under control for rest of the world.",
										choices:{
											noinfect:{
												text: "Problem solved. Minimal infections and virus has been contained \n long enough for cure/vaccine. No damage done to country",
												choices:{

												}
											}

										}
									}


								}
							}

						}
					},
					// cautious:{
					// 	text: "open borders but be cautious of what happens",
					// 	choices:{

					// 	}
					// },
					open:{
						text: "open borders and not be aware of whats happening with infections",
						choices:{
							massiveinfect:{
								text: "Massive counts of infections occur, \n spreading around the entire country at uncontrollable rates.",
								choices:{
									nocontrol:{
										text: "Allow people to still move around freely",
										choices:{
											heavydeath:{
												text: "Disease kills millions but eventually passes through country. \n With loss of millions, lots of jobs have been left unfilled and country will take years \n to repair collateral damage in letting the virus rage.",
											}

										}
									},
									martiallaw:{
										text: "Order martial law and lock down everything and everyone",
										choices:{
											noinfect:{
												text: "No new infections across country occur and virus is \n contained until those who have it die or fight it off. \n State of country is damaged but not too signifigantly.",
											}

										}
									}
								}
							}

						}
					}
			}
				};

var currentStory;
///////////////////////////////////////////CODESTART/////////////////////////////////////////

function renderStory(fable) {
	$(".text").html(fable["text"]);
	Object.keys(fable["choices"]).forEach(function(choice){
		var input = document.createElement("input");
		input.setAttribute("class","choice");
		input.setAttribute("value",choice);
		input.setAttribute("id",choice);
		input.setAttribute("type","radio");
		input.setAttribute("name","choice");
		var text = document.createElement("label");
		text.setAttribute("for",choice);
		text.setAttribute("class","decision");
		text.innerHTML =fable["choices"][choice]["text"];
		$(".choices").append(input);
		$(".choices").append(text);


/*
var rect = new joint.shapes.standard.Rectangle();
rect.position(100, 30);
rect.resize(100, 40):
rect.attr({
	label: {
		text: fable["choices"][choice]["text"];
	}
})



*/

	});
					// body...
				}

function clear(){
		$(".choices").html("");
}

//Either:
//We need to print the top of the object OR
//We need to connect all children to the top.

function initTree(storyObject, graph) {

	var rect = new joint.shapes.standard.Rectangle();
	rect.position(1500, 50);
	rect.resize(500, 50);
	rect.attr({
		label: {
			text: storyObject["text"],
		}});

	rect.addTo(graph);
	drawAndConnectChildren(rect,storyObject,graph);
}
function drawAndConnectChildren(parent,storyObject,graph){
	var offset = 0;
	Object.keys(storyObject["choices"]).forEach(function(choice){

		var currentChoice = parent.clone();

		currentChoice.attr({
			label: {
				text: storyObject["choices"][choice]["text"],
				style: ""
			}});
			console.log(currentChoice);
		currentChoice.position(currentChoice.attributes.position.x-200+offset,currentChoice.attributes.position.y +100);
		offset+=700;
		currentChoice["story"] = storyObject["choices"][choice];



		currentChoice.addTo(graph);

		var link = new joint.shapes.standard.Link();
			 link.source(parent);
			 link.target(currentChoice);
			 link.addTo(graph);

	});
					// body...



}



// function selectstory(fable)


//////////////////////////////////////////FUNCTIONSEND///////////////////////////////////////


$( document ).ready(function() {
$(document).on("change", "input[name='choice']", function () {

if(this.checked){
console.log("click");
var choice = $(this).attr("value");
currentStory = currentStory["choices"][choice];
clear();
renderStory(currentStory);
}});
    console.log( "ready!" );
    currentStory = story;

		var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
            el: document.getElementById('paper'),
            model: graph,
            width: document.getElementById('paper').width,
            height:document.getElementById('paper').height,
            gridSize: 1,
						interactive: false,
						background: {
       color: '#FFFFFF'
    				}
    });
		paper.on('cell:pointerdown',
		    function(cellView, evt, x, y) {
						if(cellView.model.story.choices != null && cellView.model.story.choices != {}){ 
							//code that runs when you click any node that is not the bottom
		        drawAndConnectChildren(cellView.model,cellView.model.story,cellView.model.graph);
		        cellView.model.attr('body/fill','lightgreen');
					}else {
						//code that runs when you click a bottom node
						console.log("No more story");
						cellView.model.attr('body/fill','lightgreen');
					}
		    }
		);

		initTree(currentStory,graph);
    //renderStory(currentStory);
});