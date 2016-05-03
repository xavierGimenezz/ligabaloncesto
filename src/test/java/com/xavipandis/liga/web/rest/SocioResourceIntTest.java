package com.xavipandis.liga.web.rest;

import com.xavipandis.liga.Application;
import com.xavipandis.liga.domain.Socio;
import com.xavipandis.liga.repository.SocioRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


/**
 * Test class for the SocioResource REST controller.
 *
 * @see SocioResource
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest
public class SocioResourceIntTest {

    private static final String DEFAULT_NOMBRE = "AAAAA";
    private static final String UPDATED_NOMBRE = "BBBBB";
    private static final String DEFAULT_APELLIDO = "AAAAA";
    private static final String UPDATED_APELLIDO = "BBBBB";

    private static final LocalDate DEFAULT_FECHA_NACIMIENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_NACIMIENTO = LocalDate.now(ZoneId.systemDefault());

    @Inject
    private SocioRepository socioRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    private MockMvc restSocioMockMvc;

    private Socio socio;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SocioResource socioResource = new SocioResource();
        ReflectionTestUtils.setField(socioResource, "socioRepository", socioRepository);
        this.restSocioMockMvc = MockMvcBuilders.standaloneSetup(socioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        socio = new Socio();
        socio.setNombre(DEFAULT_NOMBRE);
        socio.setApellido(DEFAULT_APELLIDO);
        socio.setFechaNacimiento(DEFAULT_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void createSocio() throws Exception {
        int databaseSizeBeforeCreate = socioRepository.findAll().size();

        // Create the Socio

        restSocioMockMvc.perform(post("/api/socios")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(socio)))
                .andExpect(status().isCreated());

        // Validate the Socio in the database
        List<Socio> socios = socioRepository.findAll();
        assertThat(socios).hasSize(databaseSizeBeforeCreate + 1);
        Socio testSocio = socios.get(socios.size() - 1);
        assertThat(testSocio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testSocio.getApellido()).isEqualTo(DEFAULT_APELLIDO);
        assertThat(testSocio.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void getAllSocios() throws Exception {
        // Initialize the database
        socioRepository.saveAndFlush(socio);

        // Get all the socios
        restSocioMockMvc.perform(get("/api/socios"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.[*].id").value(hasItem(socio.getId().intValue())))
                .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE.toString())))
                .andExpect(jsonPath("$.[*].apellido").value(hasItem(DEFAULT_APELLIDO.toString())))
                .andExpect(jsonPath("$.[*].fechaNacimiento").value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString())));
    }

    @Test
    @Transactional
    public void getSocio() throws Exception {
        // Initialize the database
        socioRepository.saveAndFlush(socio);

        // Get the socio
        restSocioMockMvc.perform(get("/api/socios/{id}", socio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.id").value(socio.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE.toString()))
            .andExpect(jsonPath("$.apellido").value(DEFAULT_APELLIDO.toString()))
            .andExpect(jsonPath("$.fechaNacimiento").value(DEFAULT_FECHA_NACIMIENTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSocio() throws Exception {
        // Get the socio
        restSocioMockMvc.perform(get("/api/socios/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSocio() throws Exception {
        // Initialize the database
        socioRepository.saveAndFlush(socio);

		int databaseSizeBeforeUpdate = socioRepository.findAll().size();

        // Update the socio
        socio.setNombre(UPDATED_NOMBRE);
        socio.setApellido(UPDATED_APELLIDO);
        socio.setFechaNacimiento(UPDATED_FECHA_NACIMIENTO);

        restSocioMockMvc.perform(put("/api/socios")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(socio)))
                .andExpect(status().isOk());

        // Validate the Socio in the database
        List<Socio> socios = socioRepository.findAll();
        assertThat(socios).hasSize(databaseSizeBeforeUpdate);
        Socio testSocio = socios.get(socios.size() - 1);
        assertThat(testSocio.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testSocio.getApellido()).isEqualTo(UPDATED_APELLIDO);
        assertThat(testSocio.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
    }

    @Test
    @Transactional
    public void deleteSocio() throws Exception {
        // Initialize the database
        socioRepository.saveAndFlush(socio);

		int databaseSizeBeforeDelete = socioRepository.findAll().size();

        // Get the socio
        restSocioMockMvc.perform(delete("/api/socios/{id}", socio.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Socio> socios = socioRepository.findAll();
        assertThat(socios).hasSize(databaseSizeBeforeDelete - 1);
    }
}
