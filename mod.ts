import * as xml from "@libs/xml"

console.log(xml.parse(`<?xml version="1.0" encoding="utf-8"?>
	<PackageManifest Version="2.0.0" xmlns="http://schemas.microsoft.com/developer/vsx-schema/2011" xmlns:d="http://schemas.microsoft.com/developer/vsx-schema-design/2011">
		<Metadata>
			<Identity Language="en-US" Id="neocmakelsp-vscode" Version="0.0.14" Publisher="Decodetalkers" />
			<DisplayName>neocmakelsp-vscode</DisplayName>
			<Description xml:space="preserve">vscode extension for neocmakelsp</Description>
			<Tags>cmake,CMake,__ext_cmake,cmake-cache,CMake Cache</Tags>
			<Categories>Programming Languages,Linters,Formatters</Categories>
			<GalleryFlags>Public</GalleryFlags>
			
			<Properties>
				<Property Id="Microsoft.VisualStudio.Code.Engine" Value="^1.91.0" />
				<Property Id="Microsoft.VisualStudio.Code.ExtensionDependencies" Value="" />
				<Property Id="Microsoft.VisualStudio.Code.ExtensionPack" Value="" />
				<Property Id="Microsoft.VisualStudio.Code.ExtensionKind" Value="workspace" />
				<Property Id="Microsoft.VisualStudio.Code.LocalizedLanguages" Value="" />
				<Property Id="Microsoft.VisualStudio.Code.EnabledApiProposals" Value="" />
				
				<Property Id="Microsoft.VisualStudio.Code.ExecutesCode" Value="true" />
				
				<Property Id="Microsoft.VisualStudio.Services.Links.Source" Value="https://github.com/Decodetalkers/neocmakelsp-vscode.git" />
				<Property Id="Microsoft.VisualStudio.Services.Links.Getstarted" Value="https://github.com/Decodetalkers/neocmakelsp-vscode.git" />
				<Property Id="Microsoft.VisualStudio.Services.Links.GitHub" Value="https://github.com/Decodetalkers/neocmakelsp-vscode.git" />
				<Property Id="Microsoft.VisualStudio.Services.Links.Support" Value="https://github.com/Decodetalkers/neocmakelsp-vscode/issues" />
				<Property Id="Microsoft.VisualStudio.Services.Links.Learn" Value="https://github.com/Decodetalkers/neocmakelsp-vscode#readme" />
				
				
				<Property Id="Microsoft.VisualStudio.Services.GitHubFlavoredMarkdown" Value="true" />
				<Property Id="Microsoft.VisualStudio.Services.Content.Pricing" Value="Free"/>

				
				
			</Properties>
			<License>extension/LICENSE.txt</License>
			<Icon>extension/icon.png</Icon>
		</Metadata>
		<Installation>
			<InstallationTarget Id="Microsoft.VisualStudio.Code"/>
		</Installation>
		<Dependencies/>
		<Assets>
			<Asset Type="Microsoft.VisualStudio.Code.Manifest" Path="extension/package.json" Addressable="true" />
			<Asset Type="Microsoft.VisualStudio.Services.Content.Details" Path="extension/README.md" Addressable="true" />
<Asset Type="Microsoft.VisualStudio.Services.Content.License" Path="extension/LICENSE.txt" Addressable="true" />
<Asset Type="Microsoft.VisualStudio.Services.Icons.Default" Path="extension/icon.png" Addressable="true" />
		</Assets>
	</PackageManifest>`));
