import React from "react";

const projects = props => {

 projectItems = () => {
    return props.projects.map( project => {
        return itemFromProject(project)
    })
 } 

 itemFromProject = (project) => {
    return (
            <div >
                <div>
                    <p>{project.name}</p>
                    <p>{project.description}</p>
                </div>
                <div>
                    
                </div>
            </div>
    )
 }

  return (
    <Card>
      <CardHeader>
        <p>Proyectos</p>
      </CardHeader>
      <CardBody>
        <div>
          
        </div>
      </CardBody>
      <CardFooter />
    </Card>
  );
};

export default user;
