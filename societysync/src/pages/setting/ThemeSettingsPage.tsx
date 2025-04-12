import { useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import { defaultTheme, type ThemeConfig } from "../../utils/theme"
import Card from "../../components/common/Card"
import Button from "../../components/common/Button"
import Input from "../../components/common/Input"
import { Building, Save, Undo } from "lucide-react"

const ThemeSettingsPage = () => {
  const { theme, setTheme } = useTheme()
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({ ...theme })
  const [previewBackground, setPreviewBackground] = useState(theme.colors.backgroundGradient)

  const handleColorChange = (colorKey: string, value: string) => {
    setThemeConfig({
      ...themeConfig,
      colors: {
        ...themeConfig.colors,
        [colorKey]: value,
      },
    })
  }

  const handleNameChange = (value: string) => {
    setThemeConfig({
      ...themeConfig,
      name: value,
    })
  }

  const handleBackgroundGradientChange = (value: string) => {
    setPreviewBackground(value)
    setThemeConfig({
      ...themeConfig,
      colors: {
        ...themeConfig.colors,
        backgroundGradient: value,
      },
    })
  }

  const handleSave = () => {
    setTheme(themeConfig)
  }

  const handleReset = () => {
    setThemeConfig({ ...defaultTheme })
    setPreviewBackground(defaultTheme.colors.backgroundGradient)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Theme Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card title="Theme Configuration">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Society Information</h3>
                <Input
                  label="Society Name"
                  value={themeConfig.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  fullWidth
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Primary Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary</label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={themeConfig.colors.primary}
                        onChange={(e) => handleColorChange("primary", e.target.value)}
                        className="w-10 h-10 rounded-md border border-gray-300 mr-2"
                      />
                      <Input
                        value={themeConfig.colors.primary}
                        onChange={(e) => handleColorChange("primary", e.target.value)}
                        fullWidth
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Dark</label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={themeConfig.colors.primaryDark}
                        onChange={(e) => handleColorChange("primaryDark", e.target.value)}
                        className="w-10 h-10 rounded-md border border-gray-300 mr-2"
                      />
                      <Input
                        value={themeConfig.colors.primaryDark}
                        onChange={(e) => handleColorChange("primaryDark", e.target.value)}
                        fullWidth
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Light</label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={themeConfig.colors.primaryLight}
                        onChange={(e) => handleColorChange("primaryLight", e.target.value)}
                        className="w-10 h-10 rounded-md border border-gray-300 mr-2"
                      />
                      <Input
                        value={themeConfig.colors.primaryLight}
                        onChange={(e) => handleColorChange("primaryLight", e.target.value)}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Secondary Colors</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary</label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={themeConfig.colors.secondary}
                        onChange={(e) => handleColorChange("secondary", e.target.value)}
                        className="w-10 h-10 rounded-md border border-gray-300 mr-2"
                      />
                      <Input
                        value={themeConfig.colors.secondary}
                        onChange={(e) => handleColorChange("secondary", e.target.value)}
                        fullWidth
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Dark</label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={themeConfig.colors.secondaryDark}
                        onChange={(e) => handleColorChange("secondaryDark", e.target.value)}
                        className="w-10 h-10 rounded-md border border-gray-300 mr-2"
                      />
                      <Input
                        value={themeConfig.colors.secondaryDark}
                        onChange={(e) => handleColorChange("secondaryDark", e.target.value)}
                        fullWidth
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Light</label>
                    <div className="flex items-center">
                      <input
                        type="color"
                        value={themeConfig.colors.secondaryLight}
                        onChange={(e) => handleColorChange("secondaryLight", e.target.value)}
                        className="w-10 h-10 rounded-md border border-gray-300 mr-2"
                      />
                      <Input
                        value={themeConfig.colors.secondaryLight}
                        onChange={(e) => handleColorChange("secondaryLight", e.target.value)}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Background</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Background Gradient</label>
                    <Input
                      value={themeConfig.colors.backgroundGradient}
                      onChange={(e) => handleBackgroundGradientChange(e.target.value)}
                      placeholder="e.g. from-[#FFEF80] via-[#FFCB45] to-[#FFA726]"
                      fullWidth
                      helperText="Use Tailwind CSS gradient classes"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleReset} leftIcon={<Undo className="h-4 w-4" />}>
                  Reset to Default
                </Button>
                <Button type="button" onClick={handleSave} leftIcon={<Save className="h-4 w-4" />}>
                  Save Theme
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Preview">
            <div className="space-y-6">
              <div
                className={`bg-gradient-to-br ${previewBackground} p-4 rounded-lg h-40 flex items-center justify-center`}
              >
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                  <div className="flex justify-center mb-2">
                    <div className={`bg-[${themeConfig.colors.primary}]/20 p-2 rounded-full`}>
                      <Building className={`h-6 w-6 text-[${themeConfig.colors.primaryDark}]`} />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold">{themeConfig.name}</h3>
                </div>
              </div>

              <div className="space-y-2">
                <div className={`bg-[${themeConfig.colors.primary}] text-white p-2 rounded-md text-center text-sm`}>
                  Primary Button
                </div>
                <div className={`bg-[${themeConfig.colors.secondary}] text-white p-2 rounded-md text-center text-sm`}>
                  Secondary Button
                </div>
                <div
                  className={`border border-[${themeConfig.colors.primary}] text-[${themeConfig.colors.primary}] p-2 rounded-md text-center text-sm`}
                >
                  Outline Button
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Color Palette</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className={`bg-[${themeConfig.colors.primary}] h-6 rounded`}></div>
                  <div className={`bg-[${themeConfig.colors.primaryDark}] h-6 rounded`}></div>
                  <div className={`bg-[${themeConfig.colors.primaryLight}] h-6 rounded`}></div>
                  <div className={`bg-[${themeConfig.colors.secondary}] h-6 rounded`}></div>
                  <div className={`bg-[${themeConfig.colors.secondaryDark}] h-6 rounded`}></div>
                  <div className={`bg-[${themeConfig.colors.secondaryLight}] h-6 rounded`}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ThemeSettingsPage
